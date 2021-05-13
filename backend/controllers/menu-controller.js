const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');

// models
const Menu = require('../models/menu-model');
const User = require('../models/user-model');
const MenuItem = require('../models/menuItem-model');

// retrieve all menus
const getMenus = async(req, res, next) => {
    res.status(200).json(
        {message: "Got all menus."}
    );
};

// creating a menu
const createMenu = async(req, res, next) => {
    res.status(200).json(
        {message: "Created menu."}
    );
};

// editing menu by id
const updateMenu = async(req, res, next) => {
    res.status(200).json(
        {message: "Updated menu."}
    );
};

// deleting menu by id
const deleteMenu = async(req, res, next) => {
    res.status(200).json(
        {message: "Deleted menu."}
    );
};

exports.getMenus = getMenus;
exports.createMenu = createMenu;
exports.updateMenu = updateMenu;
exports.deleteMenu = deleteMenu;