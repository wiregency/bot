export type TicketCategoryConfig = {
	id: string;
	prefix: string;
	roleId: string;
	label: string;
	emoji: string;
	description: string;
};

export type TicketCategories = {
	[key: string]: { id: string; prefix: string; roleId: string };
};

export type Ticket = {
	id?: number;
	channel_id: string;
	creator: string;
	created_at: Date;
};
