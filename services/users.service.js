const User = require("../models/user");

exports.getAllUsers = async () => {
  const users = await User.query();

  return users;
};

exports.getUserById = async (user_id) => {
  const user = await User.query().findById(1);

  return user;
};

exports.findUserByEmail = async (email) => {
  const user = await User.query().where("email", email);

  return user[0];
};

exports.findUserByUsername = async (username) => {
  const user = await User.query().where("username", username);

  return user[0];
};

exports.findUserByToken = async (refresh_token) => {
  const user = await User.query().where("refresh_token", refresh_token);

  return user[0];
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

exports.storeRefreshToken = async (email, refresh_token) => {
  const updated = await User.query()
    .patch({ refresh_token: refresh_token })
    .where("email", email);

  return updated;
};

exports.deleteRefreshToken = async (email) => {
  const updated = await User.query()
    .patch({ refresh_token: null })
    .where("email", email);

  return updated;
};

exports.checkRefreshTokenExist = async (email, refresh_token) => {
  const user = await User.query()
    .where("email", email)
    .andWhere("refresh_token", refresh_token);

  return user[0];
};
