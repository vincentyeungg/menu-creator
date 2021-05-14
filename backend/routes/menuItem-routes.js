const express = require("express");
const { check } = require('express-validator');
const router = express.Router();

const menuItemsController = require('../controllers/menuItem-controller');

// routes here start with /api/menusItems/...

// get request to retrieve all items
router.get('/', menuItemsController.getMenuItems);

// post request for creating a menu item
router.post('/', 
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('price').isNumeric()
    ],
    menuItemsController.createMenuItem);

// patch request for editing menu item by id
router.patch('/:menuItemId', 
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('price').isNumeric()
    ],
    menuItemsController.updateMenuItem);

// delete request for deleting menu item by id
router.delete('/:menuItemId', menuItemsController.deleteMenuItem);

module.exports = router;