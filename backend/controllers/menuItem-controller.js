const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const fs = require("fs");

// models
const Menu = require('../models/menu-model');
const User = require('../models/user-model');
const MenuItem = require('../models/menuItem-model');
const HttpError = require('../models/http-error');
const fileDelete = require('../middleware/file-delete');

// retrieve all items
const getMenuItems = async(req, res, next) => {
    let items;

    try {
        items = await MenuItem.find({});
    } catch (error) {
        const err = new HttpError('Fetching items failed, please try again later.', 500);
        return next(err);
    }

    res.status(200).json(
        {
            menuItems: items.map(item => 
                item.toObject({ getters: true })
            )
        }
    );
};

// retrieve all items given a menu id
const getMenuItemsByMenuId = async(req, res, next) => {
    const menuId = req.params.menuId;
    let menu;
    try {
        menu = await Menu.findById(menuId).populate('menuItem');
    } catch (error) {
        const err = new HttpError('Something went wrong, could not find menu.', 500);
        return next(err);
    }
    if (!menu) {
        return next(new HttpError('Could not find any items for the given menu Id.', 404));
    }

    res.status(200).json({
        menuItems: menu.menuItem.toObject({ getters: true })
    });
};

// retrieve item given item id
const getMenuItemByItemId = async(req, res, next) => {
    const itemId = req.params.itemId;
    let item;
    try {
        item = await MenuItem.findById(itemId);
    } catch (error) {
        const err = new HttpError('Something went wrong, could not find item.', 500);
        return next(err);
    }
    if (!item) {
        return next(new HttpError('Could not find item for the given item Id.', 404));
    }
    res.status(200).json({
        menuItem: item
    });
};

// creating a menu item
const createMenuItem = async(req, res, next) => {
    console.log('hi')
    // validate incoming req parameters
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, price, type } = req.body;
    const menuId = req.params.menuId;
    
    const createdItem = new MenuItem({
        title: title,
        description: description,
        price: price,
        type: type,
        image: req.file.location,
        menu: menuId
    });

    // need to check if the menuId exists
    let menu;
    try {
        menu = await Menu.findById(menuId);
    } catch (error) {
        const err = new HttpError('Creating menu item failed, please try again.', 500);
        return next(err);
    }

    if (!menu) {
        const error = new HttpError('Could not find a menu with the provided menu Id.', 404);
        return next(error);
    }

    // restrictions on who can edit a menu
    // only the creator can edit the menu
    // need to check token of current user against creator of menu
    if (menu.creator.toString() !== req.userData.userId) {
        const error = new HttpError("You are not allowed to create a menu item for a menu that does not belong to you.", 401);
        return next(error);
    };

    // creating item is multistep operation, need to update menuItem and menu document
    // revert all changes if any step has issues
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdItem.save({ session: session });
        menu.menuItem.push(createdItem);
        await menu.save({ session: session });
        await session.commitTransaction();
    } catch (error) {
        const err = new HttpError('Created menu item failed, please try again.', 500);
        return next(err);
    }

    res.status(200).json(
        {
            menuItem: createdItem
        }
    );
};

// editing menu item by id
const updateMenuItem = async(req, res, next) => {
    // check for parameters errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const menuItemId = req.params.menuItemId;
    const { title, description, price } = req.body;

    let menuItem;
    try {
        menuItem = await MenuItem.findById(menuItemId).populate('menu');
    } catch (error) {
        const err = new HttpError('Something went wrong, could not update menu item.', 500);
        return next(err);
    }

    // restrictions on who can edit a menu
    // only the creator can edit the menu
    // need to check token of current user against creator of menu
    if (menuItem.menu.creator.toString() !== req.userData.userId) {
        const error = new HttpError("You are not allowed to update a menu item for a different user.", 401);
        return next(error);
    };

    // get the old image and remove it
    const oldImagePath = menuItem.image;

    // update parameters
    menuItem.title = title;
    menuItem.description = description;
    menuItem.price = price;
    
    if (!!req.file) {
        menuItem.image = req.file.location;
        fileDelete(oldImagePath);
    }

    try {
        await menuItem.save();
    } catch (error) {
        const err = new HttpError('Something went wrong, could not update menu item.', 500);
        return next(err);
    }

    res.status(200).json(
        {
            menuItem: menuItem.toObject({ getters: true })
        }
    );
};

// deleting menu item by id
const deleteMenuItem = async(req, res, next) => {
    const menuItemId = req.params.menuItemId;

    let menuItem;
    try {
        menuItem = await MenuItem.findById(menuItemId).populate('menu');
    } catch (error) {
        const err = new HttpError('Something went wrong, could not delete menu item.', 500);
        return next(err);
    }

    if (!menuItem) {
        const error = new HttpError('Could not find a menu item for this id.', 404);
        return next(error);
    }

    // restrictions on who can edit a menu
    // only the creator can edit the menu
    // need to check token of current user against creator of menu
    if (menuItem.menu.creator.toString() !== req.userData.userId) {
        const error = new HttpError("You are not allowed to delete a menu item for a different user.", 401);
        return next(error);
    };

    const imagePath = menuItem.image;

    // delete the menuItem and reference from the menu
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await menuItem.remove({ session: session });
        menuItem.menu.menuItem.pull(menuItem);
        await menuItem.menu.save({ session: session });
        await session.commitTransaction();
    } catch (error) {
        const err = new HttpError('Something went wrong, could not delete item.', 500);
        return next(err);
    }

    // remove the image from s3 bucket
    fileDelete(imagePath);

    res.status(200).json(
        {message: "Deleted menu item."}
    );
};

exports.getMenuItems = getMenuItems;
exports.getMenuItemsByMenuId = getMenuItemsByMenuId;
exports.getMenuItemByItemId = getMenuItemByItemId;
exports.createMenuItem = createMenuItem;
exports.updateMenuItem = updateMenuItem;
exports.deleteMenuItem = deleteMenuItem;
