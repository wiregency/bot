import type { TicketCategoryConfig } from "../types/ticket_interface.js";

export const ticketConfig: Record<string, TicketCategoryConfig> = {
	question: {
		id: "1301929553996025866",
		prefix: "💸・order",
		roleId: "1265978378498867240",
		label: "Request a quote",
		emoji: "💸",
		description: "Request a quote for a project.",
	},
	bug: {
		id: "1301929867515924602",
		prefix: "❓・other",
		roleId: "1265978378498867240",
		label: "Other assistance",
		emoji: "❓",
		description: "Need help with one of our publicly available products.",
	},
};

export const getTicketCategories = () => {
	const categories: Record<
		string,
		{ id: string; prefix: string; roleId: string }
	> = {};
	for (const [key, value] of Object.entries(ticketConfig)) {
		categories[key] = {
			id: value.id,
			prefix: value.prefix,
			roleId: value.roleId,
		};
	}
	return categories;
};

export const getTicketOptions = () => {
	return Object.entries(ticketConfig).map(([value, config]) => ({
		label: config.label,
		value: value,
		emoji: config.emoji,
		description: config.description,
	}));
};
