var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var hbs = require("express-handlebars");
var nodemailer = require("nodemailer");

/*==========Route==========*/
var index = require("./routes/index");
var contact = require("./routes/contact");

/*==========Initialize app==========*/
var app = express();

/*==========View engine==========*/
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs({
  extname: "hbs",
  defaultLayout: __dirname + "/views/layouts/default.hbs",
  layoutsDir: __dirname + "/views/",
  partialDir: __dirname + "/views/layouts"
}));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*==========Route files middleware==========*/
app.use("/", index);
app.use("/contact", contact);

/*==========Set port==========*/
app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

module.exports = app;
//var path = require('path');

//alert("Hello World");
