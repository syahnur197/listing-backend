const faker = require("faker");
const Item = require("../../models/item");
const User = require("../../models/user");
const { pickRandomElement } = require("../../utils");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  knex.raw("TRUNCATE TABLE users CASCADE");

  const user_ids = await User.query().select("id");

  const items_count = 50;

  for (let i = 0; i < items_count; i++) {
    await Item.query().insert({
      user_id: pickRandomElement(user_ids).id,
      name: faker.name.firstName(),
      short_description: faker.lorem.sentence(15),
      description: faker.lorem.sentence(200),
      price: 10000,
      sold: faker.datatype.boolean(),
    });
  }

  return;
};
