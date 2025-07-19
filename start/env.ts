import dotenv from "dotenv";
import Joi from "joi";
import logger from "../config/logger.js";

dotenv.config();

const envSchema = Joi.object({
	BOT_TOKEN: Joi.string().required(),
	NODE_ENV: Joi.string()
		.valid("development", "production")
		.default("development"),
}).unknown();

const { error, value: env } = envSchema.validate(process.env);

if (error) {
	logger.error(`Configuration validation error: ${error.message}`);
	process.exit(1);
}

export default env;
