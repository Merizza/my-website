var express = require("express");
var router = express.Router();

/*Connect to the database*/
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/myblog");
var db = mongoose.connection;

var {Post} = require("../db/models/post.js");

/*GET blog page*/
router.get("/", function(req, res, next) {
  Post.find({}, function(err, post) {
    if(err) throw err;
    
     res.render("partials/blog", {
        "post": post
     });
  });
});

/*GET addpost page*/
router.get("/add", function(req, res, next) {
  res.render("partials/addpost");
});

module.exports = router;