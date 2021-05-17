exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().index();
    table.string("brand", 40);
    table.string("model", 40);
    table.string("body_type", 40);
    table.string("fuel_type", 40);
    table.string("transmission", 40);
    table.string("drive_type", 40);
    table.string("payment_term", 10);
    table.decimal("price", 11, 2);
    table.bigInteger("mileage");
    table.string("colour", 20).nullable();
    table.text("description").nullable();
    table.json("images").nullable();
    table.datetime("sold_at").default(null).nullable();
    table.timestamps(true, true);

    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
