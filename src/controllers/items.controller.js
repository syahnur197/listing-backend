const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const { authenticateToken } = require("../middlewares/authenticateToken");
const Item = require("../models/item");

const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../services/items.service");

router.get("/", async (req, res) => {
  const { page } = req.query;

  const items = await getAllItems(page);

  res.json({ items });
});

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

router.post(
  "/",
  authenticateToken,
  body("name")
    .isLength({ min: 1 })
    .withMessage("Name must not be less than 1 character")
    .isLength({ max: 40 })
    .withMessage("Name must not be more than 40 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price must not be empty")
    .isDecimal()
    .withMessage("Price must be in decimal")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 1 BND"),

  body("short_description")
    .isLength({ min: 30 })
    .withMessage("Short description must not be less than 30 characters")
    .isLength({ max: 255 })
    .withMessage("Short description must not be more than 255 characters"),

  body("description")
    .isLength({ min: 30 })
    .withMessage("Description must not be less than 30 characters")
    .isLength({ max: 1000 })
    .withMessage("Description must not be more than 1000 characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.user;
    const _user_id = user.id;

    const { name, price, description } = req.body;

    const _item = {
      name,
      price,
      description,
      user_id: _user_id,
    };

    const item = await createItem(_item);

    res.status(201).json({ item });
  }
);

router.patch("/:item_id", authenticateToken, async (req, res) => {
  const { item_id } = req.params;

  let item = await getItemById(item_id);

  if (!item instanceof Item) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });

    return;
  }

  if (!item.isOwnedBy(req.user.id)) {
    res.status(401).json({
      success: false,
      message: "You cannot update other user's item!",
    });

    return;
  }

  const body = req.body;

  // replace item value in request body
  for (const [key, value] of Object.entries(body)) {
    item[key] = body[key];
  }

  const updated_item = await updateItem(item);

  if (!updated_item)
    return res.status(400).json({ success: false, message: "Fail to update!" });

  res.json({ item: updated_item });
});

router.delete("/:item_id", authenticateToken, async (req, res) => {
  const { item_id } = req.params;

  let item = await getItemById(item_id);

  if (!item instanceof Item) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });

    return;
  }

  if (!item.isOwnedBy(req.user.id)) {
    res.status(401).json({
      success: false,
      message: "You cannot delete other user's item!",
    });

    return;
  }

  const deleted_item = await deleteItem(item.id);

  if (!deleted_item)
    return res.status(400).json({ success: false, message: "Fail to update!" });

  res.json({ success: true, message: "Item deleted!" });
});

module.exports = router;
