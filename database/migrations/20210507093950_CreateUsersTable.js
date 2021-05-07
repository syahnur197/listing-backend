exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("email").unique();
    table.string("username").unique();
    table.string("password");
    table.string("mobile_number");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
