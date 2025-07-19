import { IntentsBitField, Partials } from "discord.js";
import { Client } from "discordx";
import { initDatabase } from "./config/database.js";
import logger from "./config/logger.js";

export const bot = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMessageReactions,
		IntentsBitField.Flags.GuildVoiceStates,
		IntentsBitField.Flags.MessageContent,
	],
	silent: (process.env.NODE_ENV || "development") === "production",
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

bot.once("ready", async () => {
	await initDatabase();
	await bot.initApplicationCommands();
	logger.info(`Logged in as ${bot.user?.tag}`);
});

bot.on("interactionCreate", async (interaction) => {
	await bot.executeInteraction(interaction);
});
