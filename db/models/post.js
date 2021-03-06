var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  category: String,
  body: String,
  date : String,
  mainImageName: String
});

var Post = mongoose.model("Post", PostSchema);

module.exports = {Post};