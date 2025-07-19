import {
	type Guild,
	PermissionsBitField,
	type TextChannel,
	type User,
} from "discord.js";
import { createTranscript } from "discord-html-transcripts";
import { getTicketCategories } from "../config/ticket_config.js";
import { createTranscriptEmbed } from "../helper/ticket_embeds.js";
import { TicketRepository } from "../repository/ticket_repository.js";
import type { Ticket, TicketCategories } from "../types/ticket_interface.js";

export async function createTicket(
	guild: Guild,
	user: User,
	selectedCategory: string,
): Promise<TextChannel> {
	const ticketCategories = getTicketCategories();
	const category = ticketCategories[selectedCategory];

	const name = user.username.toLowerCase();
	const channelName = `${category.prefix}-${name}`;

	const channel = await guild.channels.create({
		name: channelName,
		parent: category.id,
		permissionOverwrites: [
			{ id: user.id, allow: [PermissionsBitField.Flags.ViewChannel] },
			{
				id: guild.roles.everyone.id,
				deny: [PermissionsBitField.Flags.ViewChannel],
			},
			{ id: category.roleId, allow: [PermissionsBitField.Flags.ViewChannel] },
		],
	});

	const ticketData: Omit<Ticket, "id"> = {
		channel_id: channel.id,
		creator: user.id,
		created_at: new Date(),
	};

	await TicketRepository.create(ticketData);

	return channel;
}

export async function closeTicket(interaction: any): Promise<void> {
	const channel = await interaction.guild.channels.cache.get(
		"1255165433133404201",
	);

	const ticket = await TicketRepository.getByChannelId(interaction.channel.id);

	if (!ticket) {
		await interaction.reply({ content: "Ticket not found.", ephemeral: true });
		return;
	}

	const { creator } = ticket;
	const createdAt = ticket.created_at;
	const deletedBy = interaction.user;
	const deletedAt = new Date();

	const transcript = await createTranscript(interaction.channel, {
		limit: -1,
		filename: "transcript.html",
		saveImages: true,
	});

	const message = await channel.send({
		embeds: [createTranscriptEmbed(creator, createdAt, deletedBy, deletedAt)],
	});

	const thread = await message.startThread({
		name: `Transcript - ${interaction.channel.name}`,
		autoArchiveDuration: 10080,
	});

	await thread.send({
		content: "📄 **Transcript file attached below:**",
		files: [transcript],
	});

	await TicketRepository.deleteByChannelId(interaction.channel.id);
	await interaction.channel.delete();
}
