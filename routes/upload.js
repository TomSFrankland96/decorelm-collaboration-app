const express = require('express');
const router = express.Router({ mergeParams: true });
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const upload = require('../controllers/upload');

// router.post('/', catchAsync(upload.uploadS3))