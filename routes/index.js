var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  /*Connect to the database*/
  var mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost/myblog");
  var db = mongoose.connection;

  var {Post} = require("../db/models/post.js");
  
  Post.find({}, function(err, post) {
    if(err) throw err;
    
     res.render("index", {
        "post": post
     });
  });
});

module.exports = router;
