const faker = require("faker");
const User = require("../../src/models/user");
const Car = require("../../src/models/car");
const {
  brands,
  bodyTypes,
  fuelTypes,
  transmissions,
  driveTypes,
  paymentTerms,
} = require("../../src/constants/cars");
const { pickRandomElement } = require("../../src/utils");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  knex.raw("TRUNCATE TABLE cars CASCADE");

  const user_ids = await User.query().select("id");

  const cars_count = 100;

  for (let i = 0; i < cars_count; i++) {
    await Car.query().insert({
      user_id: pickRandomElement(user_ids).id,
      brand: pickRandomElement(brands),
      model: faker.name.firstName(),
      body_type: pickRandomElement(bodyTypes),
      fuel_type: pickRandomElement(fuelTypes),
      transmission: pickRandomElement(transmissions),
      drive_type: pickRandomElement(driveTypes),
      payment_term: pickRandomElement(paymentTerms),
      price: faker.datatype.number({
        min: 100,
        max: 10000,
      }),
      mileage: faker.datatype.number({
        min: 1000,
        max: 10000,
      }),
      colour: faker.commerce.color(),
      description: faker.lorem.sentence(200),
      sold_at: null,
    });
  }

  return;
};
