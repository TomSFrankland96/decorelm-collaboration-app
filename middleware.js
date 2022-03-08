const { projectSchema, roomSchema, itemSchema, itemCategorySchema, designSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Project = require('./models/project.js');
const Room = require('./models/room.js');
const Item = require('./models/item.js');
const ItemCategory = require('./models/itemCategory.js');
const Design = require('./models/design.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/15111996');
    }
    next();
}

module.exports.validateProject = (req, res, next) => {
    const { error } = projectSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/projects/${id}`);
    }
    next();
}

module.exports.isRoomAuthor = async (req, res, next) => {
    const { id, roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/projects/${id}`);
    }
    next();
}

module.exports.validateRoom = (req, res, next) => {
    const { error } = roomSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateDesign = (req, res, next) => {
    const { error } = designSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateItemCategory = (req, res, next) => {
    const { error } = itemCategorySchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateItem = (req, res, next) => {
    const { error } = itemSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
