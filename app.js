var express = require("express");
var path = require('path');
//var cookieParser = require("cookie-parser");
//var bodyParser = require("body-parser");
var hbs = require("express-handlebars");

/*==========Route==========*/
var index = require("./routes/index");

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

app.use(express.static(path.join(__dirname, "public")));

/*==========Route files middleware==========*/
app.use("/", index);

/*==========Set port==========*/
app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

module.exports = app;
//var path = require('path');

//alert("Hello World");
