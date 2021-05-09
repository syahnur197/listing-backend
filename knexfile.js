// Update with your config settings.

const { config_db } = require("./config/config");

module.exports = {
  development: {
    client: config_db.client,
    connection: {
      port: config_db.port,
      host: config_db.host,
      database: config_db.db,
      user: config_db.username,
      password: config_db.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: config_db.client,
    connection: {
      port: config_db.port,
      host: config_db.host,
      database: config_db.db,
      user: config_db.username,
      password: config_db.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
