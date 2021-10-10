const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateItem, validateRoom, isLoggedIn, isRoomAuthor } = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const emails = require('../controllers/emails');

router.route('/')
    .post(isLoggedIn, catchAsync(emails.sendEmail))


module.exports = router;