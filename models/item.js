const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/b_white,c_pad,h_500,w_500');
});

const opts = { toJSON: { virtuals: true } };

const ItemSchema = new Schema({
    name: String,
    image: [ImageSchema],
    brand: String,
    link: String,
    price: String,
    comment: String,
    recommended: String,
    new: String
}, opts);

module.exports = mongoose.model("Item", ItemSchema);