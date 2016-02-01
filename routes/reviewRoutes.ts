'use strict';
import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');

let router = express.Router();
let User = mongoose.model('User');
let Dish = mongoose.model('Dish');
let Review = mongoose.model('Review');

let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

//POST: /api/reviews
router.post('/', auth, (req, res, next)=>{
  Dish.findOne({ _id: req.body.dish }).exec((err, dish) =>{
    if (err) return next(err);
    if (!dish) return next({ status: 404, message: 'Dish could not be found idiot. Check reviewRoutes path.'});
    req['dish'] = dish;
    next();
  });
});

//POST: /api/reviews -- This is called when Dish exists and User is logged in
router.post('/', auth, (req, res, next)=>{
  let review = new Review(req.body);
  review.created = Date.now();
  review.deleted = null;
  review.createdBy = req['payload']._id;
  review.save((err, r) => {
    if (err) return next(err);
    if (!r) return next({message: 'Error saving this review. Check reviewRoutes path.'});
    req['dish'].reviews.push(r._id);
    req['dish'].save();
    User.update({ _id: req['payload']._id }, { $push: { reviews: r._id }}, (err, result)=>{
      if (err) return next(err);
      r.populate('createdBy', 'email username', (err, com) =>{
        res.send(r);
      });
    });
  });
});

// DELETE: /api/reviews/:id
router.delete('/:id', auth, (req, res, next) =>{
  Review.update({ _id: req.params.id }, { deleted: Date.now() }, (err, result) => {
    if (err) return next(err);
    res.send({ message: 'Deleted the review' });
  });
});

export = router;
