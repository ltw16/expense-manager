var express = require("express");
var app = express();
var router = require("./routes/routes.js");
var path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"../client"));
app.use(express.static(path.join(__dirname, "../client")));

app.use("/", router);

module.exports = app;
