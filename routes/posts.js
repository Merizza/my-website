var express = require("express");
var mongodb = require("mongodb");
var router = express.Router();

var {Post} = require("../db/models/post.js");

/*Multer setup*/
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/image/uploads")
  },
  filename: function(req, file, cb) {
    var extArray = file.mimetype.split("/");
    var extension = extArray[extArray.length - 1];
    cb(null, file.originalname)
  }
});
var upload = multer({storage: storage});
var fieldUpload =  upload.fields([{name: "title"}, {name: "category"}, {name: "body"}, {name: "image"}]);

/*Connect to database*/
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/myblog");
var db = mongoose.connection;

/*POST /posts/add route*/
router.post("/add", fieldUpload, function(req, res, next) {
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var date = new Date();
  var mainImageName = req.files.image[0].filename;
  
  var posts = new Post({
    title: title,
    category: category,
    body: body,
    date: date,
    mainImageName: mainImageName
  });
  
  posts.save(function(err, results) {
    if(err) return err;
    
    res.send(results);
  });
});

module.exports = router;