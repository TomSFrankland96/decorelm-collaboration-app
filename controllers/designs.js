const Project = require('../models/project');
const Room = require('../models/room');
const Item = require('../models/item');
const Design = require('../models/design');



module.exports.createDesign = async (req, res) => {
    const project = await Project.findById(req.params.id);
    const room = await Room(req.body.room);
    const design = new Design(req.body.design);
    design.author = req.user._id;
    room.designs.push(room);
    await design.save();
    await room.save();
    await project.save();
    req.flash('success', 'Created new design!');
    res.redirect(`/projects/${project._id}/rooms/${room._id}/designs`);
};

module.exports.showDesigns = async (req, res) => {
    const { id, roomId, designs } = req.params;
    const project = await Project.findById(req.params.id)
    const room = await Room.findById(roomId).populate('designs');
    res.render('rooms/designs', { room, project, designs });
};

module.exports.renderEditForm = async (req, res) => {
    const { id, roomId } = req.params;
    const project = await Project.findById(req.params.id);
    const room = await Room.findById(roomId);
    if (!room) {
        req.flash('error', 'Cannot find that room!');
        return res.redirect(`/projects/${project._id}`);
    }
    res.render('rooms/edit', { project, room });
}

module.exports.updateRoom = async (req, res) => {
    const { id, roomId } = req.params;
    const project = await Project.findById(req.params.id);
    const room = await Room.findByIdAndUpdate(roomId, { ...req.body.room });
    await room.save();
    req.flash('success', 'Successfully updated room!');
    res.redirect(`/projects/${project._id}`)
}


module.exports.deleteRoom = async (req, res) => {
    const { id, roomId } = req.params;
    await Project.findByIdAndUpdate(id, { $pull: { rooms: roomId } });
    await Room.findByIdAndDelete(roomId);
    req.flash('success', 'Successfully deleted room');
    res.redirect(`/projects/${id}`);
}