const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// menu controller
const menusController = require('../controllers/menu-controller');

// routes here start with /api/menus/...

// get request to retrieve all menus
router.get('/', menusController.getMenus);

// get request to retrieve all menus belonging to a specific user
router.get('/user/:userId', menusController.getMenusByUserId);

// get request to retrieve specific menu given menu id
router.get('/:menuId', menusController.getMenusByMenuId);

// need a middleware here to limit the access of certain api calls i.e., post, patch, delete requests
router.use(checkAuth);

// post request for creating a menu
router.post('/', 
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty()
    ],
    menusController.createMenu);

// patch request for editing menu by id
router.patch('/:menuId', 
    [
        check('title').not().isEmpty(),
        check('description').not().isEmpty()
    ],
    menusController.updateMenu);

// delete request for deleting menu by id
router.delete('/:menuId', menusController.deleteMenu);

module.exports = router;