const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateItem, validateRoom, isLoggedIn, isRoomAuthor, validateItemCategory } = require('../middleware');
const Project = require('../models/project');
const Room = require('../models/room');
const Item = require('../models/item.js');
const items = require('../controllers/items');
const ItemCategory = require('../models/itemCategory');
const itemCategories = require('../controllers/itemCategories');
const rooms = require('../controllers/rooms');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


router.post('/', isLoggedIn, validateItemCategory, catchAsync(itemCategories.createItemCategory));

router.delete('/:itemCategoryId', isLoggedIn, catchAsync(itemCategories.deleteItemCategory))

router.route('/:itemCategoryId')
    .put(isLoggedIn, isRoomAuthor, validateItemCategory, catchAsync(itemCategories.updateItemCategory))

router.get('/:itemCategoryId/edit', isLoggedIn, isRoomAuthor, catchAsync(itemCategories.renderEditForm))


module.exports = router;