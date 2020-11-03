const { Mongoose } = require('mongoose');

const { MONGODB_URI } = process.env;

const db = (exports.db = new Mongoose());

db.set('useNewUrlParser', true);
db.set('useFindAndModify', false);
db.set('useCreateIndex', true);
db.set('useUnifiedTopology', true);

db.connect(MONGODB_URI).then(
  () => console.log('MongoDB connected'),
  (err) => console.log(err)
);
