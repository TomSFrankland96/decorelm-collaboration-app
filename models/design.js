const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_400,h_250,c_fill,pg_1').replace('.pdf', '.jpg');
});

const opts = { toJSON: { virtuals: true } };

const DesignSchema = new Schema({
    name: String,
    image: [ImageSchema],
    pdf: String,
    notes: String
}, opts);

module.exports = mongoose.model("Design", DesignSchema);