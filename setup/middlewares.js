const express = require("express");
const morgan = require("morgan");
const { accessLogStream } = require("../config/accessLogStream");

exports.setMiddlewares = (app) => {
  // setting up request logger
  app.use(morgan("common", { stream: accessLogStream }));
  app.use(express.json());
  // serve static files
  app.use("/public", express.static(__dirname + "/../public"));

  return app;
};
