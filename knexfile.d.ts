import { Knex } from "knex";

interface KnexConfig {
	development: Knex.Config;
	production: Knex.Config;
	[key: string]: Knex.Config;
}

declare const config: KnexConfig;
export default config;
