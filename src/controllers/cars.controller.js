const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/authenticateToken");
const {
  createCarValidator,
} = require("../middlewares/cars/create-car.validator");
const imageResize = require("../middlewares/upload/imageResize");
const { uploadImages } = require("../middlewares/upload/uploadImages");
const Car = require("../models/car");
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
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

  // handle file upload, form must send images field
  uploadImages,

  [...createCarValidator],

  // create car, need to use the ID for me to upload to S3
  async (req, res, next) => {
    const user = req.user;
    const user_id = user.id;

    const body = req.body;

    const car = await createCar({
      name: body.name,
      brand: body.brand,
      model: body.model,
      body_type: body.body_type,
      fuel_type: body.fuel_type,
      transmission: body.transmission,
      drive_type: body.drive_type,
      payment_term: body.payment_term,
      price: body.price,
      mileage: body.mileage,
      colour: body.colour,
      description: body.description,
      user_id: user_id,
    });

    req.car = car;
    req.model_type = "cars";
    req.model_id = car.id;

    next();
  },

  // resize images in the request and also upload to S3
  imageResize,

  async function (req, res) {
    const car = req.car;

    if (!req?.uploadedImages) {
      res.status(201).json({ car });
      return;
    }

    const carDetail = { ...car, images: JSON.stringify(req.uploadedImages) };
    const updatedCar = await updateCar(carDetail);

    res.status(201).json({ car: updatedCar });
  }
);

module.exports = router;
