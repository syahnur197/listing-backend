const express = require("express");
const imageResize = require("../middlewares/upload/imageResize");
const { upload } = require("../middlewares/upload/uploadImages");
const {
  createCar,
  getCarById,
  updateCar,
} = require("../services/cars.service");
const router = express.Router();

// define the home page route
router.post(
  "/upload",
  function (req, res, next) {
    upload(req, res, async function (err) {
      // create new car
      const car = await createCar({
        user_id: 1,
        brand: "MG",
        model: "Accent",
        body_type: "Sedan",
        fuel_type: "Petrol",
        transmission: "Manual",
        drive_type: "4WD",
        payment_term: "Cash",
        price: "100000",
        mileage: "100000",
        colour: "Yellow",
        description: "hello this is car description",
      });

      req.model_type = "cars";
      req.model_id = car.id;

      // don't throw error if user does not upload an image
      if (err) next();

      next();
    });
  },
  imageResize,
  async function (req, res) {
    if (!req?.filePaths) {
      res.json({ success: true });
      return;
    }

    const car = await getCarById(req.model_id);

    const update_car_detail = { ...car, images: JSON.stringify(req.filePaths) };
    const updated_car = await updateCar(update_car_detail);
    res.json({ success: true, message: "Successfully update car image" });
  }
);

module.exports = router;
