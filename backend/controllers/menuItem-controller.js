const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');

// models
const Menu = require('../models/menu-model');
const User = require('../models/user-model');
const MenuItem = require('../models/menuItem-model');

// retrieve all items
const getMenuItems = async(req, res, next) => {
    res.status(200).json(
        {message: "Got all menu items."}
    );
};

// creating a menu item
const createMenuItem = async(req, res, next) => {
    res.status(200).json(
        {message: "Created menu item."}
    );
};

// editing menu item by id
const updateMenuItem = async(req, res, next) => {
    res.status(200).json(
        {message: "Updated menu item."}
    );
};

// deleting menu item by id
const deleteMenuItem = async(req, res, next) => {
    res.status(200).json(
        {message: "Deleted menu item."}
    );
};

exports.getMenuItems = getMenuItems;
exports.createMenuItem = createMenuItem;
exports.updateMenuItem = updateMenuItem;
exports.deleteMenuItem = deleteMenuItem;
