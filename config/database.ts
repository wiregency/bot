import knex from "knex";
import knexConfig from "../knexfile.js";
import logger from "./logger.js";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];

const db = knex(config);

export const initDatabase = async (): Promise<void> => {
	try {
		await db.migrate.latest();
		logger.info("Database initialized and migrations executed successfully");
	} catch (error) {
		logger.error("Error initializing database:", error);
		throw error;
	}
};

export const closeDatabase = async (): Promise<void> => {
	try {
		await db.destroy();
		logger.info("Database connection closed");
	} catch (error) {
		logger.error("Error closing database connection:", error);
		throw error;
	}
};

export default db;
