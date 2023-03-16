const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const DesignSchema = new Schema({
  name: String,
  document: String,
  datePosted: String
}, opts);

module.exports = mongoose.model('Design', DesignSchema);