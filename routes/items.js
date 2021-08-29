const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateItem, validateRoom, isLoggedIn, isRoomAuthor } = require('../middleware');
const Project = require('../models/project');
const Room = require('../models/room');
const Item = require('../models/item.js');
const items = require('../controllers/items');
const rooms = require('../controllers/rooms');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.post('/', isLoggedIn, upload.array('image'), catchAsync(items.createItem))

router.route('/:itemId')
    .put(isLoggedIn, isRoomAuthor, validateItem, catchAsync(items.updateItem))

    router.get('/:itemId/edit', isLoggedIn, isRoomAuthor, catchAsync(items.renderEditForm))

router.delete('/:itemId', isLoggedIn, catchAsync(items.deleteItem))



module.exports = router;