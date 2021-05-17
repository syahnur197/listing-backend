const { findUserByEmail } = require("../services/users.service");
const jwt = require("jsonwebtoken");
const { config_app } = require("../../config/config");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // in the mean time, malas ku kan maintain the access token and refresh token
  // in the future, I should implement method untuk expiring the access token
  const APP_KEY = config_app.refresh_key;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, APP_KEY, async (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = await findUserByEmail(user.email);
    next();
  });
};
