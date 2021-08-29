const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/03121996')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/15111996')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/15111996' }), users.login)

router.get('/logout', users.logout)

module.exports = router;