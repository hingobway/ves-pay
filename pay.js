const express = require('express');

const { Invoice } = require('./models');

const r = new express.Router();

r.get('/:number', async (req, res) => {
  const invoice = await Invoice.findOne({ number: req.params.number });
  if (!invoice)
    return res.send(
      'Customer not found.<br><br>Please contact admin@virtualensembleservices.com for assistance.'
    );

  res.redirect(invoice.url);
});

module.exports = r;
