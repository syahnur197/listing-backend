const User = require("../models/user");

exports.getAllUsers = async () => {
  const users = await User.query();

  return users;
};

exports.getUserById = async (user_id) => {
  const user = await User.query().findById(1);

  return user;
};

exports.createUser = async (user_detail) => {
  const user = await User.query().insert({
    first_name: user_detail.first_name,
    last_name: user_detail.last_name,
    username: user_detail.username,
    email: user_detail.email,
    password: user_detail.password,
    mobile_number: user_detail.mobile_number,
  });

  return user;
};
