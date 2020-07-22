/* eslint-disable no-underscore-dangle */
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

const app = require('../app');

let newDriver;

describe('the driver_controller', () => {
  beforeEach('make sure our db has drivers in it', (done) => {
    newDriver = new Driver({
      email: 'email@email.com',
      driving: false,
    });

    newDriver.save()
      .then(() => {
        done();
      });
  });
  it('Put to /api/drivers/id edits an existing driver', (done) => {
    request(app)
      .put(`/api/drivers/${newDriver._id}`)
      .send({ driving: true })
      .end(() => {
        Driver.findOne({ email: 'email@email.com' })
          .then((driver) => {
            assert(driver.driving);
            done();
          });
      });
  });
  it('DELETE to /api/drivers/id can delete a driver', (done) => {
    request(app)
      .delete(`/api/drivers/${newDriver._id}`)
      .end(() => {
        Driver.findOne({ email: 'email@email.com' })
          .then((driver) => {
            assert(driver === null);
            done();
          });
      });
  });
  it('GET to /api/drivers finds drivers in a location', (done) => {
    // make two different drivers, try to get one back reliably

    const seattleDriver = new Driver({
      email: 'seattle@email.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] },
    });
    const floridaDriver = new Driver({
      email: 'florida@email.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] },
    });

    Promise.all([seattleDriver.save(), floridaDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, res) => {
            assert(res.body.length === 1);
            assert(res.body[0].email === 'florida@email.com');
            done();
          });
      });
  });
});
