const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

const opts = { toJSON: { virtuals: true } };

const DesignSchema = new Schema({
  name: String,
  document: String,
  image: [ImageSchema],
  datePosted: String
}, opts);

module.exports = mongoose.model('Design', DesignSchema);