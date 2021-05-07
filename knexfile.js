// Update with your config settings.

require("dotenv").config();

module.exports = {
  development: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      database: process.env.DATABASE_DB,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_ROOT_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
    },
  },

  production: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      database: process.env.DATABASE_DB,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_ROOT_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
    },
  },
};
