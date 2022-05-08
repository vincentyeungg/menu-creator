const request = require('supertest');
const app = require('../../app.js');
const valid_user = require('../../test/setup.js');

// tests for the backend apis reaching /api/users/
it('returns a 403 when accessing route with invalid credentials, user not logged in', async () => {
    return request(app)
        .post('/api/menus/')
        .send({
            title: 'title',
            description: 'description'
        })
        .expect(403);
});

// test authenticated routes
// tests on create

// tests on get

// tests on update

// tests on delete

// tests on get menu
