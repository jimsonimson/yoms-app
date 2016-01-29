"use strict";

import mongoose = require('mongoose');
import crypto = require('crypto');
import jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  email: { type: String, unique: true, lowercase: true },
  passwordHash: String,
  salt: String,
  dishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}],
  favoriteDishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
  // restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: ''}]
});

UserSchema.method('setPassword', function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
});

UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);
});

UserSchema.method('generateJWT', function(){
  return jwt.sign({
    _id: this.id,
    username: this.username,
    email: this.email
  }, process.env.JWT_SECRET);
});

export let User = mongoose.model('User', UserSchema);
