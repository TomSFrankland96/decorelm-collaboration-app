const mongoose = require('mongoose');
const Room = require('./room');
const Item = require('./item');
const Comment = require('./comment');
const ItemCategory = require('./itemCategory');
const Schema = mongoose.Schema;



const ProjectSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rooms: [
        {
            type: Schema.Types.ObjectId,
            itemCategories: {
                type: Schema.Types.ObjectId,
                items: {
                    type: Schema.Types.ObjectId,
                    ref: 'Item'
                },
                ref: 'ItemCategory'
            },
            comments: {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            },
            ref: 'Room'
        }
    ]
});






ProjectSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Room.deleteMany({
            _id: {
                $in: doc.rooms
            }
        })
    }
})

module.exports = mongoose.model('Project', ProjectSchema);