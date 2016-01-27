'use strict';
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');
var Dish = mongoose.model('Dish');
var Review = mongoose.model('Review');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
router.post('/', auth, function (req, res, next) {
    Dish.findOne({ _id: req.body.dish }).exec(function (err, dish) {
        if (err)
            return next(err);
        if (!dish)
            return next({ status: 404, message: 'Dish could not be found idiot. Check reviewRoutes path.' });
        req['dish'] = dish;
        next();
    });
});
router.post('/', auth, function (req, res, next) {
    var review = new Review(req.body);
    review.created = Date.now();
    review.deleted = null;
    review.createdBy = req['payload']._id;
    review.save(function (err, r) {
        if (err)
            return next(err);
        if (!r)
            return next({ message: 'Error saving this review. Check reviewRoutes path.' });
        req['dish'].reviews.push(r._id);
        req['dish'].save();
        User.update({ _id: req['payload']._id }, { $push: { reviews: r._id } }, function (err, result) {
            if (err)
                return next(err);
            r.populate('createdBy', 'email username', function (err, com) {
                res.send(r);
            });
        });
    });
});
router.delete('/:id', auth, function (req, res, next) {
    Review.update({ _id: req.params.id }, { deleted: Date.now() }, function (err, result) {
        if (err)
            return next(err);
        res.send({ message: 'Deleted the review' });
    });
});
module.exports = router;
