const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const menuItemsController = require('../controllers/menuItem-controller');
const fileUpload = require("../middleware/file-upload");

// routes here start with /api/menusItems/...

// get request to retrieve all items
router.get('/', menuItemsController.getMenuItems);

// get request to retrieve all items for a specific menu
router.get('/menu/:menuId', menuItemsController.getMenuItemsByMenuId);

// get request to retrieve specific item given id
router.get('/:itemId', menuItemsController.getMenuItemByItemId);

// need a middleware here to limit the access of certain api calls i.e., post, patch, delete requests
router.use(checkAuth);

// post request for creating a menu item
router.post('/:menuId', 
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('price').isNumeric()
    ],
    menuItemsController.createMenuItem);

// patch request for editing menu item by id
router.patch('/:menuItemId', 
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        check('price').isNumeric()
    ],
    menuItemsController.updateMenuItem);

// delete request for deleting menu item by id
router.delete('/:menuItemId', menuItemsController.deleteMenuItem);

module.exports = router;