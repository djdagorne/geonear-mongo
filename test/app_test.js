const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('the express app', () => {
  it('handles a get request to /api', (done) => {
    request(app)
      .get('/api')
      .end((err, response) => {
        done();
      });
  });
});
