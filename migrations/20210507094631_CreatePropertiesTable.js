exports.up = function (knex) {
  return knex.schema.createTable("properties", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("user_id");
    table.string("district");
    table.string("address");
    table.string("category");
    table.bigInteger("property_type_id").index();
    table.string("rooms");
    table.text("description");
    table.bigInteger("price");
    table.timestamps(true, true);

    table.foreign("property_type_id").references("property_types.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("properties");
};
