const Project = require('../models/project');
const Room = require('../models/room');
const Item = require('../models/item');
const Design = require('../models/design');
const getPostDate = require('../utils/getPostDate')

module.exports.createDesign = async (req, res) => {
    const project = await Project.findById(req.params.id);
    const room = await Room.findByIdAndUpdate(req.params.roomId);
    const design = new Design(req.body.design);
    design.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
    design.author = req.user._id;
    design.datePosted = getPostDate();
    room.designs.push(design);
    await design.save();
    await room.save();
    await project.save();
    req.flash('success', 'Created new design!');
    res.redirect(`/projects/${project._id}/rooms/${room._id}/designs`);
};


module.exports.showDesigns = async (req, res) => {
    const { id, roomId, designs } = req.params;
    const project = await Project.findById(req.params.id)
    const room = await Room.findById(roomId).populate('designs').populate('renders');
    res.render('rooms/showDesigns', { room, project, designs });
};

module.exports.renderEditForm = async (req, res) => {
    const { id, roomId, designId } = req.params;
    const project = await Project.findById(id);
    const room = await Room.findById(roomId);
    const design = await Design.findById(designId);
    if (!design) {
        req.flash('error', 'Cannot find that design!');
        return res.redirect(`/projects/${project._id}/rooms/${room._id}/designs`);
    }
    res.render('rooms/editDesign', { project, room, design });
}

module.exports.updateDesign = async (req, res) => {
    const { id, roomId, designId } = req.params;
    const project = await Project.findById(id);
    const room = await Room.findById(roomId);
    const design = await Design.findByIdAndUpdate(designId, { ...req.body.design });
    design.datePosted = getPostDate() + " (updated)";
    await design.save();
    req.flash('success', 'Successfully updated design!');
    res.redirect(`/projects/${project._id}/rooms/${room._id}/designs`)
}

module.exports.deleteDesign = async (req, res) => {
    const { id, roomId, designId } = req.params;
    await Room.findByIdAndUpdate(roomId, { $pull: { designs: designId } });
    await Design.findByIdAndDelete(designId);
    req.flash('success', 'Successfully deleted design');
    res.redirect(`/projects/${id}/rooms/${roomId}/designs`);
}

