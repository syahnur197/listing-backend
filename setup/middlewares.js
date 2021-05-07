const express = require("express");
const morgan = require("morgan");
const { accessLogStream } = require("../config/accessLogStream");

exports.setMiddlewares = (app) => {
  // setting up request logger
  app.use(morgan("common", { stream: accessLogStream }));

  // setting up the views
  app.set("view engine", "hbs");
  app.set("views", __dirname + "/../views");

  // setting up partials
  const hbs = require("hbs");
  hbs.registerPartials(__dirname + "/../views/partials", function (err) {});

  // serve static files
  app.use("/public", express.static(__dirname + "/../public"));

  return app;
};
