const express = require("express");
const { config_app } = require("./config/config");
const { setMiddlewares } = require("./setup/middlewares");
const { setRoutes } = require("./setup/routes");

const app = setRoutes(setMiddlewares(express()));

const port = config_app.port;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
