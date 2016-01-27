"use strict";
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var Dish = mongoose.model('Dish');
var User = mongoose.model('User');
var Review = mongoose.model('Review');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/', function (req, res, next) {
    Dish.find({})
        .exec(function (err, dishes) {
        if (err)
            return next(err);
        res.json(dishes);
    });
});
router.get('/:id', function (req, res, next) {
    Dish.findOne({ _id: req.params.id })
        .populate('createdBy', 'username email')
        .populate('reviews')
        .exec(function (err, dish) {
        Review.populate(dish.reviews, { path: 'createdBy', select: 'username email' }, function (err, out) {
            if (err)
                return next(err);
            if (!dish)
                return next({ message: 'Could not find your pinboard.' });
            dish.reviews = dish.reviews.filter(function (review) { return (review.deleted === null); });
            res.send(dish);
        });
    });
});
router.post('/', auth, function (req, res, next) {
    var newDish = new Dish(req.body);
    newDish.createdBy = req['payload']._id;
    newDish.save(function (err, dish) {
        if (err)
            return next(err);
        User.update({ _id: req['payload']._id }, { $push: { 'dish': dish._id } }, function (err, results) {
            if (err)
                return next(err);
            res.send(dish);
        });
    });
});
module.exports = router;
