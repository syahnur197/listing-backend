require("dotenv").config();

const express = require("express");
const { setMiddlewares } = require("./setup/middlewares");
const { setRoutes } = require("./setup/routes");

const app = setRoutes(setMiddlewares(express()));

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Brulisting listening at http://localhost:${port}`);
});
