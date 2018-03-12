var express = require("express");
var router = express.Router();

/*GET blog page*/
router.get("/", function(req, res, next) {
  res.render("partials/blog");
});

/*GET addpost page*/
router.get("/add", function(req, res, next) {
  res.render("partials/addpost");
});

module.exports = router;