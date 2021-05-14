const express = require("express");
const { config_app } = require("./config/config");
const { setMiddlewares } = require("./src/setup/middlewares");
const { setRoutes } = require("./src/setup/routes");

const app = setRoutes(setMiddlewares(express()));

const port = config_app.port;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
