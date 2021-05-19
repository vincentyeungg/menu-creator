const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');

// models
const Menu = require('../models/menu-model');
const User = require('../models/user-model');
const MenuItem = require('../models/menuItem-model');
const HttpError = require('../models/http-error');

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
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
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
        menuItem = await MenuItem.findById(menuItemId);
    } catch (error) {
        const err = new HttpError('Something went wrong, could not update menu item.', 500);
        return next(err);
    }

    // update parameters
    menuItem.title = title;
    menuItem.description = description;
    menuItem.price = price;

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
