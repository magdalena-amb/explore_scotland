const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const Campground = require('../models/campground');
const {index, renderNewForm, addNewCampground, showCampground, renderEditForm, updateCampground, deleteCampground} = require('../controllers/campgrounds');

router.get('/', catchAsync(index));

router.get('/new', isLoggedIn, renderNewForm );

router.post('/', isLoggedIn, validateCampground, catchAsync( addNewCampground));

router.get('/:id', catchAsync(showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync( renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync( updateCampground ));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync( deleteCampground ));

module.exports = router;
