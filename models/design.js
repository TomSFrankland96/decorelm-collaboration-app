const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designSchema = new Schema({
    title: String,
    link: String
});




module.exports = mongoose.model("Design", designSchema);