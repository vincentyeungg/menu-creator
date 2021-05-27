const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// port number to host backend
const port = 5000;
// db name
const dbName = 'MERN-menuDB';
const url = 'mongodb+srv://admin:M826579g@projects.wjxbx.mongodb.net/' + dbName;
const HttpError = require('./models/http-error');
const fs = require("fs");
const path = require('path');

const app = express();
app.use(bodyParser.json());

// security error CORS since front end is on another port than the back end
app.use((req, res, next) => {
    // allow access to any domain
    // allow access to any domain
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// allow frontend to obtain images with correct path
app.use('/uploads/images', express.static(path.join('uploads','images')));

// routes middleware
const menusRoutes = require('./routes/menu-routes');
const usersRoutes = require('./routes/users-routes');
const menuItemsRoutes = require('./routes/menuItem-routes');

app.use('/api/users', usersRoutes);
app.use('/api/menus', menusRoutes);
app.use('/api/menuItems', menuItemsRoutes);

// in case of connecting to unsupported routes (no responses)
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    return next(error);
});

// error middleware
app.use((error, req, res, next) => {
    // check if a response has been sent already
    if (res.headerSent) {
        return next(error);
    }
    // if there was an error, check if there was a file added, and then remove it from the system
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    // if no responses have been sent
    res.status(error.code || 500).json({
        message: error.message || 'An unknown error occurred.'
    })
});

// connection to database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    console.log(`mongoDB connection status: ${mongoose.connection.readyState}`);
});

// start server
app.listen(port, () => {
    console.log("Server started successfully on port " + port);
});