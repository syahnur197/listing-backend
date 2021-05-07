const users = require("../controllers/users.controller");
const auth = require("../controllers/auth.controller");

exports.setRoutes = (app) => {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  return app;
};
