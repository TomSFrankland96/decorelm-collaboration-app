const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateDesign, isLoggedIn, isRoomAuthor } = require('../middleware');
const designs = require('../controllers/designs');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', isLoggedIn, upload.single('image'), catchAsync(designs.createDesign))

router.get('/', catchAsync(designs.showDesigns))

router.route('/:designId')
    .put(isLoggedIn, isRoomAuthor, validateDesign, catchAsync(designs.updateDesign))

router.get('/:designId/edit', isLoggedIn, isRoomAuthor, catchAsync(designs.renderEditForm))

router.delete('/:designId', isLoggedIn, isRoomAuthor, catchAsync(designs.deleteDesign))

module.exports = router;