const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { 
        type: String,
        required: true
    },
    lastname: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // a user can have multiple places, therefore create an array to store multiple places document ids
    menus: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Menu'
    }]
});

// to ensure emails are unique and for faster queries
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);