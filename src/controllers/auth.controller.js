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
  findUserByMobileNumber,
} = require("../services/users.service");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  res.status(200).json(req.user);
});

router.post(
  "/register",

  // body("first_name")
  //   .isLength({ min: 3 })
  //   .withMessage("First name must not be less than characters")
  //   .isLength({ max: 255 })
  //   .withMessage("First name must not be mroe than 255 characters"),

  // body("last_name")
  //   .isLength({ min: 3 })
  //   .withMessage("Last name must not be less than characters")
  //   .isLength({ max: 255 })
  //   .withMessage("Last name must not be mroe than 255 characters"),

  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must not be less than characters")
    .isLength({ max: 255 })
    .withMessage("Username must not be mroe than 255 characters")
    .custom((value) => {
      return findUserByUsername(value).then((user) => {
        if (user instanceof User) {
          return Promise.reject("Username already exist");
        }
      });
    }),

  body("email")
    .isLength({ min: 3 })
    .withMessage("E-Mail address must not be less than characters")
    .isLength({ max: 255 })
    .withMessage("E-Mail address must not be mroe than 255 characters")
    .isEmail()
    .custom((value) => {
      return findUserByEmail(value).then((user) => {
        if (user instanceof User) {
          return Promise.reject("E-mail already exist");
        }
      });
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must not be less than characters"),

  body("password_confirmation")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject("Password confirmation does not match password");
      }

      return true;
    }),

  body("mobile_number")
    .notEmpty()
    .withMessage("Mobile number is required for buyers to contact")
    .isLength({ min: 10 })
    .withMessage(
      "Mobile number must be at least 10 characters. i.e, 6738885555"
    )
    .isLength({ max: 10 })
    .withMessage("Mobile number must be at most 10 characters. i.e, 6738885555")
    .custom((value) => {
      return findUserByMobileNumber(value).then((user) => {
        if (user instanceof User) {
          return Promise.reject("Mobile number is already used");
        }
      });
    }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      setTimeout(() => {
        res.status(400).json({ errors: errors.array() });
      }, 1000);
      return;
    }

    const { username, email, password, password_confirmation, mobile_number } =
      req.body;

    user = await createUser({
      username,
      email,
      password,
      password_confirmation,
      mobile_number,
    });

    setTimeout(() => {
      res.status(201).json({ user });
    }, 1000);
    return;
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

  // in the mean time, malas ku kan maintain the access token and refresh token
  // in the future, I should implement method untuk expiring the access token

  const access_token = generateAccessToken({ email: user.email });

  const refresh_token = generateRefreshToken({ email: user.email });

  await storeRefreshToken(user.email, refresh_token);

  res
    .status(200)
    .json({ success: true, user, access_token: refresh_token, refresh_token });
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
