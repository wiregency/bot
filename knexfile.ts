import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './database/migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite3'
    },
    migrations: {
      directory: './database/migrations'
    },
    useNullAsDefault: true
  }
};

export default config; 