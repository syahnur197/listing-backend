const users = require("../controllers/users.controller");
const auth = require("../controllers/auth.controller");
const items = require("../controllers/items.controller");

exports.setRoutes = (app) => {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/items", items);
  return app;
};
