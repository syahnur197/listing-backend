const { findUserByEmail } = require("../services/users.service");
const jwt = require("jsonwebtoken");
const { config_app } = require("../config/config");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const APP_KEY = config_app.key;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, APP_KEY, async (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = await findUserByEmail(user.email);
    next();
  });
};
