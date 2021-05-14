exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("user_id").index();
    table.string("name");
    table.text("description");
    table.decimal("price", 8, 2);
    table.datetime("sold_at").default(null).nullable();
    table.timestamps(true, true);

    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};
