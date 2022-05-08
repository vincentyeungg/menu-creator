const MongoMemoryServer = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app.js');

let mongo;

// valid user email
const email = 'valid_user@test.com';

// hook function to be called at the start of test script
beforeAll(async () => {
    // using a test JWT_KEY
    // process.env.JWT_KEY = 'wFBD=+22Fppy.T35';

    mongo = await MongoMemoryServer.MongoMemoryServer.create();
    // await mongo.start();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});

// hook function to be called before each test
beforeEach(async () => {
    const collections = await mongoose.connection.collections;

    for (let key in collections) {
        await collections[key].deleteMany({});
    }
});

// hook function to be called after each test
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

// valid authenticated user for authenticated routes
const valid_user = async () => {
    const firstname = 'Valid';
    const lastname = 'User_1';
    const password = 'password';

    await request(app)
        .post('/api/users/signup')
        .send({
            firstname,
            lastname,
            email,
            password
        })
        .expect(200);
};

exports.valid_user = valid_user;
exports.email = email;