exports.up = function (knex) {
  return knex.schema.createTable("properties", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("user_id").index();
    table.string("status");
    table.string("district");
    table.string("address");
    table.string("category");
    table.bigInteger("property_type_id").index();
    // table.string("rooms");
    table.text("description");
    table.bigInteger("price");
    table.timestamps(true, true);

    table.foreign("user_id").references("users.id");
    table.foreign("property_type_id").references("property_types.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("properties");
};
