const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  brands,
  fuelTypes,
  transmissions,
  driveTypes,
  paymentTerms,
  bodyTypes,
} = require("../constants/cars");
const router = express.Router();

const { authenticateToken } = require("../middlewares/authenticateToken");
const Car = require("../models/car");
const {
  getAllCars,
  getCarById,
  createCar,
} = require("../services/cars.service");

/**
 * Get all cars
 */
router.get("/", async (req, res) => {
  const { page } = req.query;

  const result = await getAllCars(page);

  res.json(result);
});

/**
 * filter
 */
router.post("/filter", async (req, res) => {
  const { page, properties } = req.body;

  const result = await getAllCars(page, properties);

  res.json(result);
});

/**
 * Get a car by ID
 */
router.get("/:car_id", async (req, res) => {
  const { car_id } = req.params;

  const car = await getCarById(car_id);

  if (!car instanceof Car) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
    return;
  }

  res.json({ car });
});

/**
 * Create a new car
 */
router.post(
  "/",
  authenticateToken,

  body("brand")
    .notEmpty()
    .withMessage("Brand must not be empty")
    .custom((value) => {
      if (!brands.includes(value)) {
        return Promise.reject("Brand selected is not valid!");
      }
      return true;
    }),

  body("model")
    .notEmpty()
    .withMessage("Model must not be empty")
    .isLength({ min: 1 })
    .withMessage("Model must not be less than 1 character")
    .isLength({ max: 40 })
    .withMessage("Model must not be more than 40 characters"),

  body("body_type")
    .notEmpty()
    .withMessage("Body Type must not be empty")
    .custom((value) => {
      if (!bodyTypes.includes(value)) {
        return Promise.reject("Body Type selected is not valid!");
      }
      return true;
    }),

  body("fuel_type")
    .notEmpty()
    .withMessage("Fuel Type must not be empty")
    .custom((value) => {
      if (!fuelTypes.includes(value)) {
        return Promise.reject("Fuel Type selected is not valid!");
      }
      return true;
    }),

  body("transmission")
    .notEmpty()
    .withMessage("Transmission must not be empty")
    .custom((value) => {
      if (!transmissions.includes(value)) {
        return Promise.reject("Transmission selected is not valid!");
      }
      return true;
    }),

  body("drive_type")
    .notEmpty()
    .withMessage("Drive Type must not be empty")
    .custom((value) => {
      if (!driveTypes.includes(value)) {
        return Promise.reject("Drive Type selected is not valid!");
      }
      return true;
    }),

  body("payment_term")
    .notEmpty()
    .withMessage("Payment Term must not be empty")
    .custom((value) => {
      if (!paymentTerms.includes(value)) {
        return Promise.reject("Payment Term selected is not valid!");
      }
      return true;
    }),

  body("price")
    .notEmpty()
    .withMessage("Price must not be empty")
    .isDecimal()
    .withMessage("Price must be in decimal")
    .isFloat({ min: 100 })
    .withMessage("Price must be greater than 100 BND")
    .isFloat({ max: 1000000 })
    .withMessage("Price must not be greater than 1,000,000 BND"),

  body("mileage")
    .notEmpty()
    .withMessage("Mileage must not be empty")
    .isFloat({ min: 100 })
    .withMessage("Mileage must be greater than 100 KM")
    .isFloat({ max: 1000000 })
    .withMessage("Mileage must not be greater than 1,000,000 KM"),

  body("colour")
    .isLength({ max: 40 })
    .withMessage("Colour must not be more than 40 characters"),

  body("description")
    .isLength({ min: 30 })
    .withMessage("Description must not be less than 30 characters")
    .isLength({ max: 5000 })
    .withMessage("Description must not be more than 5000 characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.user;
    const user_id = user.id;

    const {
      name,
      brand,
      model,
      body_type,
      fuel_type,
      transmission,
      drive_type,
      payment_term,
      price,
      mileage,
      colour,
      description,
    } = req.body;

    const _car = {
      name,
      brand,
      model,
      body_type,
      fuel_type,
      transmission,
      drive_type,
      payment_term,
      price,
      mileage,
      colour,
      description,
      user_id,
    };

    const car = await createCar(_car);

    res.status(201).json({ car });
  }
);

module.exports = router;
