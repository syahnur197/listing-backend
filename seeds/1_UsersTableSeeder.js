const User = require("../models/user");
const faker = require("faker");

exports.seed = async function (knex) {
  knex.raw("TRUNCATE TABLE users CASCADE");
  const PASSWORD = "password";

  await User.query().insert({
    first_name: "Admin",
    last_name: "Admin",
    username: "admin",
    password: PASSWORD,
    email: "admin@admin.com",
    mobile_number: "+6738885555",
  });

  let people_count = 10;

  const BRU_NUMBER = "+673";

  for (let i = 0; i < people_count; i++) {
    let random_number = Math.floor(8000000 + Math.random() * 900000);
    let phone_number = `${BRU_NUMBER}${random_number}`;
    await User.query().insert({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.name.firstName(),
      password: PASSWORD,
      email: faker.internet.email(),
      mobile_number: phone_number,
    });
  }

  return;
};
