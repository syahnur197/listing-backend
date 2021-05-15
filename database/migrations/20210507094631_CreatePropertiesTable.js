exports.up = function (knex) {
  return knex.schema.createTable("properties", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().index();
    table.string("status");
    table.string("district");
    table.string("address");
    table.string("category");
    table.integer("property_type_id").unsigned().index();
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
