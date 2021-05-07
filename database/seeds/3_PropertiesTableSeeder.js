const faker = require("faker");
const Property = require("../../models/property");
const PropertyType = require("../../models/propery-type");
const User = require("../../models/user");
const {
  pickRandomElement,
  districts,
  categories,
  statuses,
} = require("../../utils");

exports.seed = async function (knex) {
  knex.raw("TRUNCATE TABLE properties CASCADE");

  const propert_type_ids = await PropertyType.query().select("id");
  const user_ids = await User.query().select("id");

  const properties_count = 50;

  for (let i = 0; i < properties_count; i++) {
    await Property.query().insert({
      user_id: pickRandomElement(user_ids).id,
      status: pickRandomElement(statuses),
      district: pickRandomElement(districts),
      address: faker.address.streetAddress(),
      category: pickRandomElement(categories),
      property_type_id: pickRandomElement(propert_type_ids).id,
      description: faker.lorem.sentence(20),
      price: 10000,
    });
  }

  return;
};
