export const up = (knex) =>
	knex.schema.createTable("tickets", (table) => {
		table.increments("id").primary();
		table.string("channel_id").notNullable().unique();
		table.string("creator").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now());

		table.index("channel_id");
		table.index("creator");
	});

export const down = (knex) => knex.schema.dropTable("tickets");
