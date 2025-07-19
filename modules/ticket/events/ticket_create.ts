import type { StringSelectMenuInteraction } from "discord.js";
import { Discord, SelectMenuComponent } from "discordx";

import {
	createErrorEmbed,
	createTicketCreatedButton,
	createTicketCreatedEmbed,
	createTicketOpenEmbed,
	createTicketAlreadyExistsEmbed,
} from "../helper/ticket_embeds.js";
import { createTicket } from "../service/ticket_service.js";
import { TicketRepository } from "../repository/ticket_repository.js";

@Discord()
export class TicketCreate {
	@SelectMenuComponent({ id: "ticket" })
	public async handle(interaction: StringSelectMenuInteraction): Promise<void> {
		if (!interaction.member || !interaction.guild) {
			await interaction.reply({
				embeds: [createErrorEmbed()],
				ephemeral: true,
			});
			return;
		}

		const existingTickets = await TicketRepository.getByCreator(interaction.user.id);
		if (existingTickets.length > 0) {
			const existingTicket = existingTickets[0];
			await interaction.reply({
				embeds: [createTicketAlreadyExistsEmbed(existingTicket.channel_id)],
				ephemeral: true,
			});
			return;
		}

		const selectedCategory = interaction.values[0];
		await interaction.message.edit({
			components: interaction.message.components,
		});

		try {
			const channel = await createTicket(
				interaction.guild,
				interaction.user,
				selectedCategory,
			);

			await channel.send({
				embeds: [createTicketOpenEmbed(interaction.user.username)],
				components: [createTicketCreatedButton()],
			});
			await interaction.reply({
				embeds: [createTicketCreatedEmbed(channel.id)],
				ephemeral: true,
			});
		} catch (error) {
			console.error("Error creating ticket:", error);
			await interaction.reply({
				embeds: [createErrorEmbed()],
				ephemeral: true,
			});
		}
	}
}
