const { config_app } = require("../config/config");

const jwt = require("jsonwebtoken");
const KEY = config_app.key;
const REFRESH_KEY = config_app.refresh_key;

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
};

exports.comparePassword = async (plaintext_password, hashed_password) => {
  return await bcrypt.compare(plaintext_password, hashed_password);
};

exports.generateAccessToken = (user) => {
  return jwt.sign(user, KEY, {
    expiresIn: 86400, // 1 day
  });
};

exports.generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_KEY);
};

exports.verifyRefreshToken = async (refresh_token) => {
  return jwt.verify(refresh_token, REFRESH_KEY, (err, user) => {
    return { user, err };
  });
};
