const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateRoom, isLoggedIn, isRoomAuthor } = require('../middleware');
const rooms = require('../controllers/rooms');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


router.post('/', isLoggedIn, validateRoom, catchAsync(rooms.createRoom))

router.post('/:roomId', isLoggedIn, catchAsync(rooms.publishRoom))

router.get('/:roomId', catchAsync(rooms.showRoom))

router.route('/:roomId')
    .put(isLoggedIn, isRoomAuthor, validateRoom, catchAsync(rooms.updateRoom))

router.get('/:roomId/edit', isLoggedIn, isRoomAuthor, catchAsync(rooms.renderEditForm))

router.delete('/:roomId', isLoggedIn, isRoomAuthor, catchAsync(rooms.deleteRoom))

module.exports = router;


