const Room = require('../models/room');
const Item = require('../models/item');
const Project = require('../models/project');
const ItemCategory = require('../models/itemCategory');

module.exports.createItem = async (req, res) => {
    const project = await Project.findById(req.params.id);
    const room = await Room.findById(req.params.roomId);
    const itemCategory = await ItemCategory.findById(req.params.itemCategoryId);
    const item = new Item(req.body.item);
    item.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
    item.author = req.user._id;
    itemCategory.items.push(item);
    await item.save();
    await itemCategory.save();
    await room.save();
    await project.save();
    res.redirect(`/projects/${project._id}/rooms/${room._id}`)
};

module.exports.renderEditForm = async (req, res) => {
    const { itemId } = req.params;
    const project = await Project.findById(req.params.id);
    const room = await Room.findById(req.params.roomId);
    const itemCategory = await ItemCategory.findById(req.params.itemCategoryId);
    const item = await Item.findById(itemId);
    if (!item) {
        req.flash('error', 'Cannot find that category!');
        return res.redirect(`/projects/${project._id}/rooms/${room._id}`);
    }
    res.render('items/edit', { itemCategory, project, room, item });
}

module.exports.updateItem = async (req, res) => {
    const { itemId } = req.params;
    const project = await Project.findById(req.params.id);
    const room = await Room.findById(req.params.roomId);
    const item = await Item.findByIdAndUpdate(itemId, { ...req.body.item });
    await item.save();
    req.flash('success', 'Successfully updated item!');
    res.redirect(`/projects/${project._id}/rooms/${room._id}`)
}

module.exports.deleteItem = async (req, res) => {
    const { id, roomId, itemCategoryId, itemId } = req.params;
    await Project.findByIdAndUpdate(id);
    await Room.findByIdAndUpdate(roomId);
    await ItemCategory.findByIdAndUpdate(itemCategoryId, { $pull: { items: itemId } });
    await Item.findByIdAndDelete(itemId);
    res.redirect(`/projects/${id}/rooms/${roomId}`);
};
