const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { accessLogStream } = require("../../config/accessLogStream");

exports.setMiddlewares = (app) => {
  // setting up request logger
  app.use(
    cors({
      origin: ["http://localhost:3000"],
    })
  );

  // app.options("*", cors());

  app.use(morgan("common", { stream: accessLogStream }));
  app.use(express.json());

  // serve static files
  app.use("/public", express.static(__dirname + "/../public"));

  return app;
};
