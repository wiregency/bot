import db from "../../../config/database.js";
import type { Ticket } from "../types/ticket_interface.js";

export class TicketRepository {
	static async create(ticketData: Omit<Ticket, "id">): Promise<Ticket> {
		const [id] = await db("tickets").insert(ticketData).returning("id");

		return {
			id: typeof id === "object" ? id.id : id,
			...ticketData,
		};
	}

	static async getByChannelId(channelId: string): Promise<Ticket | null> {
		const ticket = await db("tickets").where("channel_id", channelId).first();

		return ticket || null;
	}

	static async getByCreator(creatorId: string): Promise<Ticket[]> {
		return await db("tickets")
			.where("creator", creatorId)
			.orderBy("created_at", "desc");
	}

	static async deleteByChannelId(channelId: string): Promise<boolean> {
		const deletedRows = await db("tickets")
			.where("channel_id", channelId)
			.del();

		return deletedRows > 0;
	}

	static async updateByChannelId(
		channelId: string,
		updateData: Partial<Omit<Ticket, "id" | "channel_id">>,
	): Promise<Ticket | null> {
		await db("tickets").where("channel_id", channelId).update(updateData);

		return await TicketRepository.getByChannelId(channelId);
	}

	static async getAll(): Promise<Ticket[]> {
		return await db("tickets").orderBy("created_at", "desc");
	}

	static async exists(channelId: string): Promise<boolean> {
		const ticket = await db("tickets").where("channel_id", channelId).first();

		return !!ticket;
	}
}
