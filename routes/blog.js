var express = require("express");
var router = express.Router();

/*Connect to the database*/
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/myblog");
var db = mongoose.connection;

var {Post} = require("../db/models/post.js");

/*GET blog page*/
router.get("/", function(req, res, next) {
  Post.find({}, function(err, posts) {
    if(err) throw err;
    
    console.log(posts);
    
     res.render("partials/blog", {
        "posts": posts,
        "helpers": function(text, length) {
          var shorten_text = text.substring(0, length);
          return shorten_text;
        }
     });
  });
});

/*GET addpost page*/
router.get("/add", function(req, res, next) {
  res.render("partials/addpost");
});

module.exports = router;