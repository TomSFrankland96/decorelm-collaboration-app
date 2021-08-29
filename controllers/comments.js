const Project = require('../models/project');
const Room = require('../models/room');
const Item = require('../models/item');
const Comment = require('../models/comment');

module.exports.createComment = async (req, res) => {
    const project = await Project.findById(req.params.id);
    const room = await Room.findById(req.params.roomId);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    room.comments.push(comment);
    await comment.save();
    await room.save();
    await project.save();
    res.redirect(`/projects/${project._id}/rooms/${room._id}`)
};

module.exports.deleteItem = async (req, res) => {
    const {id, roomId, commentId} = req.params;
    await Project.findByIdAndUpdate();
    await Room.findByIdAndUpdate(roomId, { $pull: { items: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/projects/${id}/rooms/${roomId}`);
};