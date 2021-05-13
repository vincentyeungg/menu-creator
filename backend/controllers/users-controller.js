const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const HttpError = require('../models/http-error');

// models
const Menu = require('../models/menu-model');
const User = require('../models/user-model');
const MenuItem = require('../models/menuItem-model');

// get all users
const getUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        const err = new HttpError('Fetching users failed, please try again later.', 500);
        return next(err);
    }
    // return a users object of all the users found
    res.status(200).json(
        {users: users.map(user => 
            user.toObject({ getters: true })
            )
        }
    );
};

// login
const login = async(req, res, next) => {
    res.status(200).json(
        {message: "Logged in."}
    );
};

// sign up
const signup = async(req, res, next) => {
    res.status(200).json(
        {message: "Signed up."}
    );
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;