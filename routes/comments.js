const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateItem, validateRoom, isLoggedIn, isRoomAuthor, validateComment } = require('../middleware');
const Project = require('../models/project');
const Room = require('../models/room');
const Item = require('../models/item.js');
const items = require('../controllers/items');
const rooms = require('../controllers/rooms');
const comments = require('../controllers/comments');
const Comment = require('../models/comment');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.post('/', isLoggedIn, validateComment, catchAsync(comments.createComment))

router.delete('/:itemId', isLoggedIn, validateComment, catchAsync(comments.deleteComment))



module.exports = router;