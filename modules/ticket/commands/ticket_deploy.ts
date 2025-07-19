import {
	ActionRowBuilder,
	type CommandInteraction,
	type MessageActionRowComponentBuilder,
	MessageFlags,
	StringSelectMenuBuilder,
} from "discord.js";
import { Discord, Slash } from "discordx";
import { getTicketOptions } from "../config/ticket_config.js";
import { createTicketEmbed } from "../helper/ticket_embeds.js";

@Discord()
export class TicketDeploy {
	@Slash({
		description: "Deploy the ticket system.",
		name: "ticket",
	})
	async ticketDeploy(interaction: CommandInteraction): Promise<void> {
		const ticketOptions = getTicketOptions();

		const ticketEmbed = createTicketEmbed();

		const menu = new StringSelectMenuBuilder()
			.addOptions(ticketOptions)
			.setCustomId("ticket")
			.setPlaceholder("Select your category");

		const buttonRow =
			new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
				menu,
			);

		await interaction.reply({
			content: "The ticket system has been deployed.",
			flags: MessageFlags.Ephemeral,
		});

		if (interaction.channel && "send" in interaction.channel) {
			await interaction.channel.send({
				embeds: [ticketEmbed],
				components: [buttonRow],
			});
		}
	}
}
