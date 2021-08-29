const Room = require('../models/room');
const Item = require('../models/item');
const Project = require('../models/project');
const ItemCategory = require('../models/itemCategory');


module.exports.createItemCategory = async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id);
    const room = await Room.findByIdAndUpdate(req.params.roomId);
    const itemCategory = new ItemCategory(req.body.itemCategory);
    itemCategory.author = req.user._id;
    room.itemCategories.push(itemCategory);
    await itemCategory.save();
    await room.save();
    await project.save();
    res.redirect(`/projects/${project._id}/rooms/${room._id}`)
};

module.exports.renderEditForm = async (req, res) => {
    const { id, roomId, itemCategoryId } = req.params;
    const project = await Project.findById(req.params.id);
    const room = await Room.findById(req.params.roomId);
    const itemCategory = await ItemCategory.findById(itemCategoryId)
    if (!itemCategory) {
        req.flash('error', 'Cannot find that category!');
        return res.redirect(`/projects/${project._id}/rooms/${room._id}`);
    }
    res.render('itemCategories/edit', { itemCategory, project, room });
}

module.exports.updateItemCategory = async (req, res) => {
    const { id, roomId, itemCategoryId } = req.params;
    const project = await Project.findById(req.params.id);
    const room = await Room.findById(req.params.roomId);
    const itemCategory = await ItemCategory.findByIdAndUpdate(itemCategoryId, { ...req.body.itemCategory });
    await itemCategory.save();
    req.flash('success', 'Successfully updated category!');
    res.redirect(`/projects/${project._id}/rooms/${room._id}`)
}


module.exports.deleteItemCategory = async (req, res) => {
    const {id, roomId, itemCategoryId} = req.params;
    await Project.findByIdAndUpdate();
    await Room.findByIdAndUpdate(roomId, { $pull: { itemCategories: itemCategoryId } });
    await ItemCategory.findByIdAndDelete(itemCategoryId);
    res.redirect(`/projects/${id}/rooms/${roomId}`);
};

