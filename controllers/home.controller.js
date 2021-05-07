const express = require("express");
const { getAllUsers } = require("../services/user.service");
const router = express.Router();

// define the home page route
router.get("/", async function (req, res) {
  const users = await getAllUsers();
  res.render("home/index", { users });
});

module.exports = router;
