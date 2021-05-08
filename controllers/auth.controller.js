const express = require("express");
const { body, validationResult } = require("express-validator");
const { authenticateToken } = require("../middlewares/authenticateToken");
const User = require("../models/user");
const {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../services/hasher.service");
const {
  createUser,
  findUserByEmail,
  findUserByUsername,
  storeRefreshToken,
  findUserByToken,
  deleteRefreshToken,
} = require("../services/users.service");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  res.status(200).json(req.user);
});

router.post(
  "/register",

  body("first_name").notEmpty(),

  body("last_name").notEmpty(),

  body("username")
    .notEmpty()
    .custom((value) => {
      return findUserByUsername(value).then((user) => {
        if (user instanceof User) {
          return Promise.reject("Username already exist");
        }
      });
    }),

  body("email")
    .notEmpty()
    .isEmail()
    .custom((value) => {
      return findUserByEmail(value).then((user) => {
        if (user instanceof User) {
          return Promise.reject("E-mail already exist");
        }
      });
    }),

  body("password").notEmpty(),

  body("password_confirmation")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject("Password confirmation does not match password");
      }

      return true;
    }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      password_confirmation,
      mobile_number,
    } = req.body;

    user = await createUser({
      first_name,
      last_name,
      username,
      email,
      password,
      password_confirmation,
      mobile_number,
    });

    res.status(201).json({ user });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await findUserByEmail(email);

  if (user === undefined) {
    res.status(400).json({ success: false, message: "Invalid credential!" });
    return;
  }

  const hashed_password = user.password;

  const password_matched = await comparePassword(password, hashed_password);

  if (!password_matched) {
    res.status(400).json({ success: false, message: "Invalid credential!" });
    return;
  }

  const access_token = generateAccessToken({ email: user.email });

  const refresh_token = generateRefreshToken({ email: user.email });

  await storeRefreshToken(user.email, refresh_token);

  res.status(200).json({ user, access_token, refresh_token });
});

router.post("/token", async (req, res) => {
  const refresh_token = req.body.token;

  if (refresh_token === null) return res.sendStatus(401);

  let _user = await findUserByToken(refresh_token);

  if (_user === undefined) return res.sendStatus(401);

  const { user, err } = await verifyRefreshToken(refresh_token);

  if (err) return res.sendStatus(403);

  if (!_user instanceof User) return res.sendStatus(401);

  const access_token = await generateAccessToken({ email: user.email });

  res.json({ access_token });
});

router.delete("/", async (req, res) => {
  const refresh_token = req.body.token;

  if (refresh_token === null) return res.sendStatus(401);

  const _user = await findUserByToken(refresh_token);

  if (!_user instanceof User) return res.sendStatus(401);

  const { user, err } = await verifyRefreshToken(refresh_token);

  if (err) return res.sendStatus(403);

  await deleteRefreshToken(user.email);

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

module.exports = router;
