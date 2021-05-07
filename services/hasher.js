const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
};

exports.comparePassword = async (plaintext_password, hashed_password) => {
  return await bcrypt.compare(plaintext_password, hashed_password);
};
