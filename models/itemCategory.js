const mongoose = require('mongoose');
const Room = require('./room');
const Project = require('./project');
const Item = require('./item');
const Schema = mongoose.Schema;


const ItemCategorySchema = new Schema({
    name: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

ItemCategorySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Item.deleteMany({
            _id: {
                $in: doc.items
            }
        })
    }
})


module.exports = mongoose.model("ItemCategory", ItemCategorySchema);