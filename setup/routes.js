const home = require("../controllers/home.controller");

exports.setRoutes = (app) => {
  app.use("/", home);
  return app;
};
