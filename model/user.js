'use strict';

let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mobile: String,
    password: String,
    id: Number,
    create_time: String,
})

userSchema.index({ id: 1 });

const User = mongoose.model('User', userSchema);


module.export = User;