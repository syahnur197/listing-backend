const Car = require("../models/car");
const { getPaginations, appendFilter } = require("../utils");

const page_size = 20;

exports.getAllCars = async (current_page = 1, properties = []) => {
  const queried_page = current_page - 1;

  let query = Car.query().withGraphFetched("user");

  query = appendFilter(query, properties);

  query = query.orderBy("created_at", "desc");

  if (parseInt(current_page) === -1) {
    const cars = await query;

    return { cars };
  }

  const result = await query.page(queried_page, page_size);

  const cars = result.results;

  return {
    cars,
    pagination: getPaginations(result.total, current_page, page_size),
  };
};

exports.getCarById = async (car_id) => {
  const car = await Car.query().withGraphFetched("user").findById(car_id);

  return car;
};

exports.findCar = async (property) => {
  const cars = await this.findCars(property);

  return cars[0];
};

exports.findCars = async (property) => {
  const key = Object.keys(property)[0];
  const value = property[key];

  const cars = await Car.query().where(key, value);

  return cars;
};

exports.createCar = async (car) => {
  const car_detail = {
    user_id: car.user_id,
    brand: car.brand,
    model: car.model,
    body_type: car.body_type,
    fuel_type: car.fuel_type,
    transmission: car.transmission,
    drive_type: car.drive_type,
    payment_term: car.payment_term,
    price: car.price,
    mileage: car.mileage,
    colour: car.colour,
    description: car.description,
  };

  const created_car = await Car.query().insert(car_detail);

  return created_car;
};

exports.updateCar = async (car) => {
  const { id, ...car_detail } = car;

  const updated_car = await Car.query().patch(car_detail).where("id", id);

  if (updated_car) {
    return car;
  }

  return false;
};

exports.deleteCar = async (car_id) => {
  const deleted_car = await Car.query().deleteById(parseInt(car_id));

  return deleted_car > 0;
};
