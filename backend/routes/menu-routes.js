const express = require("express");
const { check } = require('express-validator');
const router = express.Router();

// menu controller
const menusController = require('../controllers/menu-controller');

// routes here start with /api/menus/...

// get request to retrieve all menus
router.get('/', menusController.getMenus);

// post request for creating a menu
router.post('/', menusController.createMenu);

// patch request for editing menu by id
router.patch('/:menuId', menusController.updateMenu);

// delete request for deleting menu by id
router.delete('/:menuId', menusController.deleteMenu);

module.exports = router;