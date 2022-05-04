const MongoMemoryServer = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongo;

// hook function to be called at the start of test script
beforeAll(async () => {
    // using a test JWT_KEY
    // process.env.JWT_KEY = 'wFBD=+22Fppy.T35';

    mongo = new MongoMemoryServer();
    await mongo.start();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
});

// hook function to be called before each test
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// hook function to be called after each test
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});