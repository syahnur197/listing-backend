require("dotenv").config();

exports.config_app = {
  env: process.env.APP_ENV || "development",
  port: process.env.APP_PORT || 4000,
  key: process.env.APP_KEY || "app_key",
  refresh_key: process.env.REFRESH_KEY || "secret_key",
};

exports.config_db = {
  client: process.env.DATABASE_CLIENT || "pg",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD || "secret",
  db: process.env.DATABASE_DB || "database",
};
