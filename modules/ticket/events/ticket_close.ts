import type { ButtonInteraction } from "discord.js";
import { ButtonComponent, Discord } from "discordx";

import { closeTicket } from "../service/ticket_service.js";

@Discord()
export class TicketClose {
	@ButtonComponent({ id: "close" })
	async closeTicket(interaction: ButtonInteraction): Promise<void> {
		await closeTicket(interaction);
	}
}
