"use strict";

import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Dish = mongoose.model('Dish');
let User = mongoose.model('User');
let Review = mongoose.model('Review');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//GET: /api/dishes
router.get('/', (req, res, next) => {
  Dish.find({})
    .exec((err, dishes) =>{
      if (err) return next(err);
      res.json(dishes);
    })
});

//GET: //api/dishes/:id
router.get('/:id', (req, res, next) => {
  Dish.findOne({ _id: req.params.id })
  .populate('createdBy', 'username email')
  .populate('reviews')
  // .populate('reviews.createdBy', 'username email')
  .exec((err, dish) => {
    Review.populate(dish.reviews, {path: 'createdBy', select: 'username email'}, (err, out) =>{
      if (err) return next(err);
      if (!dish) return next({ message: 'Could not find your pinboard.' });
      dish.reviews = dish.reviews.filter((review)=> (review.deleted ===null));
      res.send(dish);
    });
  });
});

//POST: /api/dishes
router.post('/', auth, (req, res, next) => {
  let newDish = new Dish(req.body);
  newDish.createdBy = req['payload']._id;
  newDish.save((err, dish) =>{
    if(err) return next(err);
    User.update({ _id: req['payload']._id}, { $push: { 'dish': dish._id}}, (err, results) =>{
      if (err) return next(err);
      res.send(dish);
    });
  });
});

export = router;
