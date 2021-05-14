const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../services/users.service");

// define the home page route
router.get("/", async function (req, res) {
  const users = await getAllUsers();

  res.json({ users });
});

module.exports = router;
