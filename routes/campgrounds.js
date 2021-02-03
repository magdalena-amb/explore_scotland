const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const {index, renderNewForm, addNewCampground, showCampground, renderEditForm, updateCampground, deleteCampground} = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage}); 


router.route('/')
    .get(catchAsync(index))
    // .post(isLoggedIn, validateCampground, catchAsync( addNewCampground));
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send('It worked!!!!')
    })
router.get('/new', isLoggedIn, renderNewForm );

router.route('/:id')
    .get(catchAsync(showCampground))
    .put( isLoggedIn, isAuthor, validateCampground, catchAsync( updateCampground ))
    .delete( isLoggedIn, isAuthor, catchAsync( deleteCampground ));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync( renderEditForm));

module.exports = router;
