const express = require("express");
const app = express();

// setting up the views
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials", function (err) {});

// setting up routing

const home = require("./controllers/home");

app.use("/", home);

// serving static assets

app.use("/public", express.static(__dirname + "/public"));

const port = 3000;

app.listen(port, () => {
  console.log("Brulisting listening at http://localhost:3000");
});
