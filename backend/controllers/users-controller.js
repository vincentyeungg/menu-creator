const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const HttpError = require('../models/http-error');

// models
const User = require('../models/user-model');

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
    // login requires email and password
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        const err = new HttpError('Login failed, please try again.', 500);
        return next(err);
    }

    // if no existing users or password is incorrect
    if (!existingUser || existingUser.password !== password) {
        // 401 unauthorized
        const error = new HttpError('Invalid credentials, could not log you in.', 401);
        return next(error);
    }

    res.status(200).json(
        {
            message: "Logged in.",
            user: existingUser.toObject({ getters: true })
        }
    );
};

// sign up
const signup = async(req, res, next) => {
    // validate the checks done from the router

    // use 422 for well formed data, however incorrect semantically
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    // if no errors in body arguments
    const { firstname, lastname, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        // something went wrong with server code 500
        const err = new HttpError('Sign up failed, please try again.', 500);
        return next(err);
    }

    // if a user with the same email is found
    if (existingUser) {
        // request is invalid but the issue is not in syntax or authentication
        const err = new HttpError(`User with the email ${email} already exists. Please login instead.`, 422);
        return next(err);
    }

    // if user didn't exist, then add them to the database
    const createdUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        menus: []
    });

    // store model in collection
    try {
        await createdUser.save();
    } catch (error) {
        const err = new HttpError('Signup failed, please try again.', 500);
        return next(err);
    }

    res.status(200).json(
        {user: createdUser.toObject({ getters: true })}
    );
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;