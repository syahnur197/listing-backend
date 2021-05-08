const express = require("express");
const { authenticateToken } = require("../middlewares/authenticateToken");
const Item = require("../models/item");
const {
  getAllItems,
  getItemById,
  createItem,
} = require("../services/items.service");
const router = express.Router();

router.get("/:item_id", async (req, res) => {
  const { item_id } = req.params;

  const item = await getItemById(item_id);

  if (!item instanceof Item) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
    return;
  }

  res.json({ item });
});

router.get("/", async (req, res) => {
  const { page } = req.query;

  const items = await getAllItems(page);

  res.json({ items });
});

router.post("/", authenticateToken, async (req, res) => {
  const user = req.user;
  const _user_id = user.id;

  const { name, price, user_id, description } = req.body;

  const _item = {
    name,
    price,
    user_id,
    description,
    user_id: _user_id,
  };

  const item = await createItem(_item);

  res.json(201).json({ item });
});

module.exports = router;
