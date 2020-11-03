const { db } = require('./db');

exports.Invoice = db.model(
  'Invoice',
  db.Schema({
    number: String,
    url: String,
  })
);
