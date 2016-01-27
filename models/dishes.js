'use strict';
var mongoose = require('mongoose');
var DishSchema = new mongoose.Schema({
    dishName: { type: String, required: true },
    imgurl: { type: String, required: true },
    tags: [{ type: String, required: true }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String }
    }
});
exports.Dish = mongoose.model('Dish', DishSchema);
