exports.seed = function (knex) {
  knex.raw("TRUNCATE TABLE property_types CASCADE");
  return knex("property_types").insert([
    { name: "2 Storey Detached" },
    { name: "2 Storey Semi-Detached" },
    { name: "2 Storey Terrace" },
    { name: "2.5 Storey Detached" },
    { name: "2.5 Storey Semi-Detached" },
    { name: "2.5 Storey Terrace" },
    { name: "3 Storey Detached" },
    { name: "3 Storey Semi-Detached" },
    { name: "3 Storey Terrace" },
    { name: "Bungalow" },
    { name: "Apartment" },
    { name: "Flat" },
    { name: "Land" },
    { name: "Shophouse" },
    { name: "Others" },
  ]);
};
