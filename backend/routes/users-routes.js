const express = require("express");
const { check } = require('express-validator');
const router = express.Router();

// routes here start with /api/users/...
const usersControllers = require('../controllers/users-controller');

// get request to retrieve all users
router.get('/', usersControllers.getUsers);

// post request for login
router.post('/login', usersControllers.login);

// post request for sign up
// perform initial check on parameters
router.post('/signup', 
    [
        check('firstname').not().isEmpty(),
        check('lastname').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ], 
    usersControllers.signup);

module.exports = router;