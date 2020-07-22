const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/muber_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', (err) => {
      // eslint-disable-next-line no-console
      console.warn('Uh oh, something went wrong: ', err);
    });
});

beforeEach((done) => {
  // mongoose normalizes collection names by lowercasing them
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => drivers.createIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
