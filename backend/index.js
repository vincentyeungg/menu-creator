const mongoose = require('mongoose');
const port = 5000; // port number to host backend

// import express app object
const app = require('./app.js');

const start = async () => {
    // setup database connection and listen on specified port with imported express app object

    // ensure all environment variables needed are defined and available
    if (!process.env.DB_USER) {
        console.log('DATABASE USER IS UNDEFINED');
    }

    if (!process.env.DB_PASSWORD) {
        console.log('DATABASE PASSWORD IS UNDEFINED');
    }

    if (!process.env.DB_NAME) {
        console.log('DATABASE NAME IS UNDEFINED');
    }

    try {
        // connection string to database
        const db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@projects.wjxbx.mongodb.net/${process.env.DB_NAME}`;

        // connect to mongo db
        mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
            console.log(`mongoDB connection status: ${mongoose.connection.readyState}`);
            console.log('connected to mongodb');
        });
    } catch (err) {
        console.log('unable to connect to mongodb');
        console.log(err);
    }

    // start server
    app.listen(process.env.PORT || port, () => {
        console.log("Server started successfully on port " + port);
    });
};

// coonect to db, and listen on configured port for incoming traffic
start();