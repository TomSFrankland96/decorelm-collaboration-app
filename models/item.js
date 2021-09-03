const mongoose = require('mongoose');
const Room = require('./room');
const Project = require('./project');
const ItemCategory = require('./itemCategory')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/c_crop,h_500,w_500');
});

const opts = { toJSON: { virtuals: true } };

const ItemSchema = new Schema({
    name: String,
    image: [ImageSchema],
    brand: String,
    link: String,
    price: Number,
    recommended: String
}, opts);

module.exports = mongoose.model("Item", ItemSchema);