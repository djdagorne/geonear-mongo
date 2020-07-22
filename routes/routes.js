const DriversController = require('../controllers/driver_controllers');

module.exports = (app) => {
  app.get('/api', DriversController.greeting); // not invoking function, just referencing it!
  app.post('/api/drivers', DriversController.create);
  app.put('/api/drivers/:id', DriversController.edit);
  app.delete('/api/drivers/:id', DriversController.delete);
  app.get('/api/drivers', DriversController.index);
};
