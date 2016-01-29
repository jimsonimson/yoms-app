'use strict';

import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Dish = mongoose.model('Dish');
let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//GET: /api/bananas
router.get('/', auth, (req, res, next) => {
  Dish.find({ favoritedByUser: req['payload']._id })
    .exec((err, dishes) => {
      if (err) return next(err);
      res.json(dishes);
    })
})

//POST: /api/bananas
router.post('/', auth, (req, res, next) => {
  Dish.findOne({ _id: req.body.dish })
  .exec((err, dish) => {
    if(dish) {
      dish.favoritedByUser.push(req['payload']._id);
      dish.save();
      next();
    };
  });
});

//POST: /api/bananas AFTER dish model.favoritedByUser IS UPDATED WITH NEW Object
router.post('/', (req, res, next) => {
  User.findOne({ _id: req['payload']._id })
  .exec((err, user) => {
    if(user) {
      user.favoriteDishes.push(req.body.dish);
      user.save();
      res.send({message: 'User has added this dish to their favorites'});
    };
  });
});

export = router;
