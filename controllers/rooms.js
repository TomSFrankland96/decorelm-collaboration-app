const Project = require('../models/project');
const Room = require('../models/room');

module.exports.createRoom = async (req, res) => {
  const project = await Project.findById(req.params.id);
  const room = new Room(req.body.room);
  room.author = req.user._id;
  project.rooms.push(room);
  await room.save();
  await project.save();
  req.flash('success', 'Created new room!');
  res.redirect(`/projects/${project._id}`);
};

module.exports.showRoom = async (req, res) => {
  const { roomId, items, itemCategories } = req.params;
  const project = await Project.findById(req.params.id)
  const room = await Room.findById(roomId)
    .populate({
      path: 'itemCategories',
      populate: {
        path: 'items'
      }
    });
  if (!project) {
    req.flash('error', 'Cannot find that room!');
    return res.redirect(`/projects/${project._id}`);
  }
  res.render('rooms/show', { room, project, items, itemCategories });
};

module.exports.showRender = async (req, res) => {
  const { roomId } = req.params;
  const project = await Project.findById(req.params.id)
  const room = await Room.findById(roomId)
  if (!project || !room) {
    req.flash('error', 'Cannot find that render!');
    return res.redirect(`/projects/${project._id}`);
  }
  res.render('rooms/showRender', { room, project });
};

module.exports.renderEditForm = async (req, res) => {
  const { roomId } = req.params;
  const project = await Project.findById(req.params.id);
  const room = await Room.findById(roomId);
  if (!room) {
    req.flash('error', 'Cannot find that room!');
    return res.redirect(`/projects/${project._id}`);
  }
  res.render('rooms/edit', { project, room });
}

module.exports.updateRoom = async (req, res) => {
  const { roomId } = req.params;
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

module.exports.publishRoom = async (req, res) => {
  const { id, roomId } = req.params;
  const project = await Project.findById(req.params.id);
  const room = await Room.findById(roomId, { ...req.body.room });
  room.published = true;
  await Room.findByIdAndUpdate(roomId)
  res.redirect(`/projects/${id}`)
}
