exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table.bigInteger("user_id").index();
    table.string("name");
    table.string("short_description");
    table.text("description");
    table.bigInteger("price");
    table.boolean("sold").default(false);
    table.timestamps(true, true);

    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};
