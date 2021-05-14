const users = require("../controllers/users.controller");
const auth = require("../controllers/auth.controller");
const items = require("../controllers/items.controller");
const cars = require("../controllers/cars.controller");

exports.setRoutes = (app) => {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/items", items);
  app.use("/api/cars", cars);
  return app;
};
