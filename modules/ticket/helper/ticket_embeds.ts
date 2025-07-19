import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} from "discord.js";

export function createTicketOpenEmbed(username?: string): EmbedBuilder {
	return new EmbedBuilder()
		.setURL("https://wiregency.com")
		.setThumbnail(
			"https://cdn.discordapp.com/attachments/1263537425389457570/1301888046601601075/image.png?ex=687a403a&is=6878eeba&hm=48b162f197a3ba13cdb58f922797b7553f3590746cc1f820a22c203c5f330e68&",
		)
		.setTitle("WireGency ・ Ticket")
		.setDescription(
			`👋 **Hello ${username}, welcome to your client space!**\n\nThank you for contacting our support team.\n\n📝 **Next steps:**\nPlease describe your request as precisely as possible so we can assist you effectively.\n\n⏱️ Our team will respond as soon as possible.\n\n*We appreciate your patience and look forward to helping you!* ✨`,
		)
		.setColor("#46ba67");
}

export function createTicketEmbed(): EmbedBuilder {
	return new EmbedBuilder()
		.setURL("https://wiregency.com")
		.setThumbnail(
			"https://cdn.discordapp.com/attachments/1263537425389457570/1301888046601601075/image.png?ex=687a403a&is=6878eeba&hm=48b162f197a3ba13cdb58f922797b7553f3590746cc1f820a22c203c5f330e68&",
		)
		.setTitle("WireGency ・ Ticket")
		.setDescription(
			"🎫 **Contact our team by opening a ticket**\n\nTo open a ticket, **select a category** below.\n\n📋 **Instructions:**\n• Choose the appropriate category\n• Describe your request clearly\n• Our team will respond quickly\n\n⚡ **Response time:** 2-4 hours\n\n*Please be courteous and polite in your interactions!* ✨",
		)
		.setColor("#46ba67");
}

export function createTicketCreatedButton(): ActionRowBuilder<ButtonBuilder> {
	const button = new ButtonBuilder()
		.setCustomId("close")
		.setLabel("Close")
		.setStyle(ButtonStyle.Danger);

	return new ActionRowBuilder<ButtonBuilder>().addComponents(button);
}

export function createTicketCreatedEmbed(channelId: string): EmbedBuilder {
	return new EmbedBuilder()
		.setAuthor({
			name: "Ticket created",
			iconURL:
				"https://cdn.discordapp.com/attachments/1263537425389457570/1395501027255386112/checked.png?ex=687aad1c&is=68795b9c&hm=4cf9d97b60fb27e15c91e974426cd7152f9e11c77bc85b23cc416ef912f54c6f&",
		})
		.setDescription(`Your ticket has been created <#${channelId}>`)
		.setColor("#46ba67");
}

export function createErrorEmbed(): EmbedBuilder {
	return new EmbedBuilder()
		.setAuthor({
			name: "Error",
			iconURL:
				"https://cdn.discordapp.com/attachments/1263537425389457570/1395501639963770913/warning.png?ex=687aadae&is=68795c2e&hm=e0aae04afdf34a9c0b2b4c9aa1da44dbbcca6e3eeeef29f5cff5d30fcf7dee00&",
		})
		.setDescription("An error occurred while creating the ticket.")
		.setColor("#46ba67")
		.setTimestamp();
}

export function createTicketAlreadyExistsEmbed(existingChannelId: string): EmbedBuilder {
	return new EmbedBuilder()
		.setAuthor({
			name: "Ticket Already Exists",
			iconURL:
				"https://cdn.discordapp.com/attachments/1263537425389457570/1395501639963770913/warning.png?ex=687aadae&is=68795c2e&hm=e0aae04afdf34a9c0b2b4c9aa1da44dbbcca6e3eeeef29f5cff5d30fcf7dee00&",
		})
		.setDescription(`❌ **You already have an open ticket**\n\nPlease use your existing ticket: <#${existingChannelId}>\n\n*You can only have one ticket open at a time.*`)
		.setColor("#ff6b6b")
		.setTimestamp();
}

export function createTranscriptEmbed(
	creator: string,
	createdAt: Date | string,
	deletedBy: string,
	deletedAt: Date | string,
): EmbedBuilder {
	const createdDate =
		createdAt instanceof Date ? createdAt : new Date(createdAt);
	const deletedDate =
		deletedAt instanceof Date ? deletedAt : new Date(deletedAt);

	const createdAtTimestamp = Math.floor(createdDate.getTime() / 1000);
	const deletedAtTimestamp = Math.floor(deletedDate.getTime() / 1000);

	return new EmbedBuilder()
		.setThumbnail(
			"https://cdn.discordapp.com/attachments/1263537425389457570/1301888046601601075/image.png?ex=687a403a&is=6878eeba&hm=48b162f197a3ba13cdb58f922797b7553f3590746cc1f820a22c203c5f330e68&",
		)
		.setTitle("WireGency ・ Ticket")
		.setDescription(
			`📋 **Ticket Information & Archive**\n\nThis ticket has been permanently closed and all messages have been saved to a transcript file for future reference.`,
		)
		.addFields(
			{
				name: "👤 Created by",
				value: `<@${creator}>`,
				inline: true,
			},
			{
				name: "📅 Created on",
				value: `<t:${createdAtTimestamp}:F>`,
				inline: true,
			},
			{
				name: "\u200B",
				value: "\u200B",
				inline: true,
			},
			{
				name: "🗑️ Closed by",
				value: `${deletedBy}`,
				inline: true,
			},
			{
				name: "📅 Closed on",
				value: `<t:${deletedAtTimestamp}:F>`,
				inline: true,
			},
			{
				name: "\u200B",
				value: "\u200B",
				inline: true,
			},
		)
		.setColor("#46ba67")
		.setTimestamp();
}

export function createUserAddedEmbed(
	userId: string,
	addedBy: string,
): EmbedBuilder {
	return new EmbedBuilder()
		.setAuthor({
			name: "User Added",
			iconURL:
				"https://cdn.discordapp.com/attachments/1263537425389457570/1395501027255386112/checked.png?ex=687aad1c&is=68795b9c&hm=4cf9d97b60fb27e15c91e974426cd7152f9e11c77bc85b23cc416ef912f54c6f&",
		})
		.setDescription(
			`✅ **<@${userId}> has been added to this ticket**\n\nAdded by: <@${addedBy}>\nThey can now view and participate in this ticket.`,
		)
		.setColor("#46ba67")
		.setTimestamp();
}

export function createUserRemovedEmbed(
	userId: string,
	removedBy: string,
): EmbedBuilder {
	return new EmbedBuilder()
		.setAuthor({
			name: "User Removed",
			iconURL:
				"https://cdn.discordapp.com/attachments/1263537425389457570/1395501639963770913/warning.png?ex=687aadae&is=68795c2e&hm=e0aae04afdf34a9c0b2b4c9aa1da44dbbcca6e3eeeef29f5cff5d30fcf7dee00&",
		})
		.setDescription(
			`🚫 **<@${userId}> has been removed from this ticket**\n\nRemoved by: <@${removedBy}>\nThey can no longer view or participate in this ticket.`,
		)
		.setColor("#46ba67")
		.setTimestamp();
}

export function createTicketClosingEmbed(closedBy: string): EmbedBuilder {
	return new EmbedBuilder()
		.setAuthor({
			name: "Ticket Closing",
			iconURL:
				"https://cdn.discordapp.com/attachments/1263537425389457570/1395607457010548757/books.png?ex=687b103a&is=6879beba&hm=98c260b7ada1fb37dc23c9ca342e4364e6d25c252208662cc505e1d5949fb733&",
		})
		.setDescription(
			`🔄 **This ticket is being closed**\n\nClosed by: <@${closedBy}>\nGenerating transcript and archiving...`,
		)
		.setColor("#46ba67")
		.setTimestamp();
}
