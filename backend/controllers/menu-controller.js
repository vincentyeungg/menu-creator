const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');

// models
const Menu = require('../models/menu-model');
const User = require('../models/user-model');
const MenuItem = require('../models/menuItem-model');
const HttpError = require('../models/http-error');

// retrieve all menus
const getMenus = async(req, res, next) => {
    let menus;

    // get all documents
    try {
        menus = await Menu.find({}).populate('creator');
    } catch (error) {
        const err = new HttpError('Fetching menus failed, please try again later.', 500);
        return next(err);
    }

    res.status(200).json(
        {menus: menus.map(menu => 
            menu.toObject({ getters: true })
            )
        }
    );
};

// get menu by user id
const getMenusByUserId = async(req, res, next) => {
    const userId = req.params.userId;
    let menus;
    try {
        menus = await Menu.find({ 'creator': userId }).populate('creator');
    } catch (error) {
        const err = new HttpError('Something went wrong, could not find menus.', 500);
        return next(err);
    }
    if (!menus) {
        return next(new HttpError('Could not find menus for given user Id.', 404));
    }
    res.status(200).json({
        menus: menus.map(menu => (
            menu.toObject({ getters: true })
        ))
    });
};

// get menu by menuId
const getMenusByMenuId = async(req, res, next) => {
    const menuId = req.params.menuId;
    let menu;
    try {
        menu = await Menu.findById(menuId);
    } catch (error) {
        const err = new HttpError('Something went wrong, could not find menu.', 500);
        return next(err);
    }
    if(!menu) {
        return next(new HttpError('Could not find the menu for the given id.', 404));
    }
    res.status(200).json({
        menu: menu
    });
};

// creating a menu
const createMenu = async(req, res, next) => {
    // validate the incoming req parameters first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, creator} = req.body;

    const createdMenu = new Menu({
        title: title,
        description: description,
        creator: creator
    });

    // need to check if creator exists yet
    // user can only create a menu if they have an account
    let user;
    try {
        user = await User.findById(creator);
    } catch (error) {
        const err = new HttpError('Creating menu failed, please try again.', 500);
        return next(err);
    }

    if (!user) {
        const error = new HttpError('Could not find a user for the provided user Id.', 404);
        return next(error);
    }

    // creating a menu is a multistep operation since user and menu collections need updating
    // if any action fails, need to revert all actions
    try {
        const session = await mongoose.startSession();
        // start transaction within current session
        session.startTransaction();
        await createdMenu.save({ session: session });
        // add the current menu under the identified user id's menu array
        user.menus.push(createdMenu);
        await user.save({ session: session });
        // commit transactions within current session
        await session.commitTransaction();
    } catch (error) {
        const err = new HttpError('Created menu failed, please try again.', 500);
        return next(err);
    }

    res.status(200).json(
        {menu: createdMenu}
    );
};

// editing menu by id
const updateMenu = async(req, res, next) => {
    const menuId = req.params.menuId;
    const { title, description } = req.body;

    // check for parameters errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    let menu;
    try {
        menu = await Menu.findById(menuId);
    } catch (error) {
        const err = new HttpError('Something went wrong, could not update menu.', 500);
        return next(err);
    }

    menu.title = title;
    menu.description = description;

    try {
        await menu.save();
    } catch (error) {
        const err = new HttpError('Something went wrong, could not update place.', 500);
        return next(err);
    }

    res.status(200).json(
        {
            menu: menu.toObject({ getters: true })
        }
    );
};

// deleting menu by id
const deleteMenu = async(req, res, next) => {

    const menuId = req.params.menuId;
    // when deleting menu, need to remove from menu, user, and any items that belong to the menu
    let menu;
    try {
        menu = await Menu.findById(menuId).populate('creator');
    } catch (error) {
        const err = new HttpError('Something went wrong, could not delete menu.', 500);
        return next(err);
    }

    if (!menu) {
        const error = new HttpError('Could not find a menu for this id.', 404);
        return next(error);
    }

    // delete the menu that was found with the menuId, as well as clear up the User's menus
    // clear up any menuItems that belong to the menu Id
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await menu.remove({ session: session });
        menu.creator.menus.pull(menu);
        await menu.creator.save({ session: session });
        await MenuItem.deleteMany({ 'menu': menuId });
        await session.commitTransaction();
    } catch (error) {
        const err = new HttpError('Something went wrong, could not delete menu.', 500);
        return next(err);
    }

    res.status(200).json(
        {message: "Deleted menu."}
    );
};

exports.getMenus = getMenus;
exports.getMenusByUserId = getMenusByUserId;
exports.getMenusByMenuId = getMenusByMenuId;
exports.createMenu = createMenu;
exports.updateMenu = updateMenu;
exports.deleteMenu = deleteMenu;