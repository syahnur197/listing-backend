const express = require("express");
const { getAllUsers } = require("../services/users.service");
const router = express.Router();

// define the home page route
router.get("/", async function (req, res) {
  const users = await getAllUsers();

  res.json({ users });
});

module.exports = router;
