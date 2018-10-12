var express = require("express");
var app = express();
var router = require("./routes/routes.js");
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"../client"));
app.use(express.static(path.join(__dirname, "../client")));

app.use("/", router);

var port = 8081 || process.env.PORT;

mongoose.connect('mongodb://LiamWebb:Mailbbew1@ds139251.mlab.com:39251/expenses')

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

module.exports = app;
