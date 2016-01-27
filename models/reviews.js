'use strict';
var mongoose = require('mongoose');
var ReviewSchema = new mongoose.Schema({
    review: { type: String, required: true },
    posted: { type: Number, default: Date.now },
    deleted: { type: Number, default: null },
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.Review = mongoose.model('Review', ReviewSchema);
