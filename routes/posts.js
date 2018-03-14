var express = require("express");
var router = express.Router();

/*Multer setup*/
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "." + extension)
  }
});
var upload = multer({storage: storage});
var fieldUpload =  upload.fields([{name: "title"}, {name: "category"}, {name: "body"}, {name: "image"}]);

/*Connect to database*/
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/myblog");
var db = mongoose.connection;

/*POST add post page route*/
router.post("/add", fieldUpload, function(req, res, next) {
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();
  var mainImageName = req.files.mainImage[0].filename;
});

module.exports = router;