const faker = require("faker");
const Item = require("../../src/models/item");
const User = require("../../src/models/user");
const { pickRandomElement } = require("../../src/utils");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  knex.raw("TRUNCATE TABLE items CASCADE");

  const user_ids = await User.query().select("id");

  const items_count = 50;

  for (let i = 0; i < items_count; i++) {
    await Item.query().insert({
      user_id: pickRandomElement(user_ids).id,
      name: faker.name.firstName(),
      name: faker.name.firstName(),
      description: faker.lorem.sentence(200),
      price: 10000,
      sold_at: null,
    });
  }

  return;
};
