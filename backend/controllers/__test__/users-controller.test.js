const request = require('supertest');
const app = require('../../app.js');
const valid_email = require('../../test/setup.js');

// tests for the backend apis reaching /api/users/

// get all users
it('returns a 200 response on successful get all users', async () => {
    return request(app)
        .get('/api/users/')
        .send()
        .expect(200);
});

// sign up tests
// if invalid inputs passed
it('returns 422 when invalid email is passed in', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            firstname: 'test',
            lastname: 'user1',
            email: 'test1', //invalid email
            password: 'q1q1q1q1'
        })
        .expect(422);
});

it('returns 422 when invalid firstname is passed in', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            firstname: '',
            lastname: 'user1',
            email: 'test1@test.com',
            password: 'q1q1q1q1'
        })
        .expect(422);
});

it('returns 422 when invalid lastname is passed in', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            firstname: 'test',
            lastname: '',
            email: 'test1@test.com',
            password: 'q1q1q1q1'
        })
        .expect(422);
});

it('returns 422 when password passed in is less than 6 characters', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            firstname: 'test',
            lastname: 'user1',
            email: 'test1@test.com',
            password: 'q1q1q'
        })
        .expect(422);
});

// returns 200 when user signs up with valid input data, and email is not taken
it('returns 200 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            firstname: 'test',
            lastname: 'user1',
            email: 'test1@test.com',
            password: 'q1q1q1q1'
        })
        .expect(200);
});

// returns 422 when user signs up with email that is already taken
it('returns 422 when user signs up with taken email', async () => {
    const response = request(app)
        .post('/api/users/signup')
        .send({
            firstname: 'test',
            lastname: 'user1',
            email: valid_email.email,
            password: 'q1q1q1q1'
        })
        .expect(422);
});