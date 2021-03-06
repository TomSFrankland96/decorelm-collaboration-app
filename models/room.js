const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');
const ItemCategory = require('./itemCategory');

const roomSchema = new Schema({
    title: String,
    itemCategories: [{
        type: Schema.Types.ObjectId,
        items: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        ref: 'ItemCategory'
    }],
    designs: [{
        type: Schema.Types.ObjectId,
        ref: 'Design'
    }],
    render: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    published: Boolean,
});

roomSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await ItemCategory.deleteMany({
            _id: {
                $in: doc.itemCategories
            }
        })
    }
})



module.exports = mongoose.model("Room", roomSchema);

