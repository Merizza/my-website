var express = require("express");
var mongodb = require("mongodb");
var moment = require("moment");
var router = express.Router();
var {ObjectID} = require("mongodb");
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

/*GET /posts route*/
router.get("/", function(req, res, next) {
  res.send("printed");
});

/*GET /posts/:id route*/
router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  Post.findById({"_id": id}, function(err, post) {
    if(err) throw err;
    
    res.render("partials/singlepost", {
      "post": post
    });
  });
});

/*POST /posts/add route*/
router.post("/add", fieldUpload, function(req, res, next) {
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var formattedDate = moment(new Date()).format("L");
  console.log(formattedDate);
  var mainImageName = req.files.image[0].filename;
  
  var posts = new Post({
    title: title,
    category: category,
    body: body,
    date: formattedDate,
    mainImageName: mainImageName
  });
  
  posts.save(function(err, results) {
    if(err) return err;
    
    res.send(results);
  });
});

module.exports = router;