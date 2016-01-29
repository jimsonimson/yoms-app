'use strict';

import mongoose = require('mongoose');
let DishSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  imgurl: { type: String, required: true },
  tags: [{ type: String, required: true}],
  reviews: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  favoritedByUser: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: {
    name: { type: String, required: true },
    address: { type: String, required: true},
    phone: { type: String },
    location: { }
  }
});

export let Dish = mongoose.model('Dish', DishSchema);
