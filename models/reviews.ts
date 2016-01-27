'use strict';
import mongoose = require('mongoose');

let ReviewSchema =  new mongoose.Schema({
  review: { type: String, required: true },
  posted: { type: Number, default: Date.now },
  deleted: { type: Number, default: null },
  dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export let Review = mongoose.model('Review', ReviewSchema);
