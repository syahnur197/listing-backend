exports.up = function (knex) {
  return knex.schema.createTable("property_types", (table) => {
    table.bigIncrements("id").primary();
    table.string("name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("property_types");
};
