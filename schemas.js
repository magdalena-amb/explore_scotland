const Joi = require('joi');

//this is not a mongoose Schema, it's joy Schema, which validates req.body before mongoose!
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()  
    }).required()
});