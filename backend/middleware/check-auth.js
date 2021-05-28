const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');
const ADMIN_DATA = require('../admin_data');

module.exports = (req, res, next) => {
    // for requests like post, patch, delete, the browser automatically sends an OPTIONS request
    // before the actual request to see if the request will be permitted
    if (req.method === "OPTIONS") {
        return next();
    }

    // encode tokens into the header of incoming requests
    // req.headers.authorization -> Authorization: 'Bearer TOKEN'

    // check if token exists in the header
    try {
        const token = req.headers.authorization.split(' ')[1];   
        if (!token) {
            throw new Error('Authentication failed.');
        }
        // verify returns the payload in the token
        const decodedToken = jwt.verify(token, ADMIN_DATA.SECRET_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        const err = new HttpError('Authentication failed.', 401);
        return next(err);
    }
};