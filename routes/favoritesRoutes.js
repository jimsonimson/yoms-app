'use strict';
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var Dish = mongoose.model('Dish');
var User = mongoose.model('User');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/', auth, function (req, res, next) {
    Dish.find({ favoritedByUser: req['payload']._id })
        .exec(function (err, dishes) {
        if (err)
            return next(err);
        res.json(dishes);
    });
});
router.post('/', auth, function (req, res, next) {
    Dish.findOne({ _id: req.body.dish })
        .exec(function (err, dish) {
        if (dish) {
            dish.favoritedByUser.push(req['payload']._id);
            dish.save();
            next();
        }
        ;
    });
});
router.post('/', function (req, res, next) {
    User.findOne({ _id: req['payload']._id })
        .exec(function (err, user) {
        if (user) {
            user.favoriteDishes.push(req.body.dish);
            user.save();
            res.send({ message: 'User has added this dish to their favorites' });
        }
        ;
    });
});
module.exports = router;
