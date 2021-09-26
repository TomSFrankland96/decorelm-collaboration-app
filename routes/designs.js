const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateDesign, isLoggedIn, isRoomAuthor } = require('../middleware');
const Project = require('../models/project');
const Room = require('../models/room');
const rooms = require('../controllers/rooms');
const Design = require('../models/design');
const designs = require('../controllers/designs');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


router.post('/', isLoggedIn, validateDesign, catchAsync(designs.createDesign))

router.get('/:designId', catchAsync(designs.showDesign))

router.route('/:designId')
    .put(isLoggedIn, isRoomAuthor, validateDesign, catchAsync(designs.updateDesign))

router.get('/:designId/edit', isLoggedIn, isRoomAuthor, catchAsync(designs.renderEditForm))

router.delete('/:designId', isLoggedIn, isRoomAuthor, catchAsync(rooms.deleteDesign))

module.exports = router;