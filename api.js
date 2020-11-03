const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const Err = require('./err');

const { Invoice } = require('./models');

const { API_KEY } = process.env;

// AUTHORIZE REQUESTS
function auth(req, res, next) {
  let auth = req.get('authorization');
  if (!auth) return res.err(401, 'NO_AUTHORIZATION');
  auth = auth.split(' ');
  if (!(auth[0] === 'Basic')) return res.err(401, 'INVALID_AUTHORIZATION');
  if (
    crypto.createHash('sha256').update(auth[1]).digest().toString('hex') !==
    API_KEY
  )
    return res.err(401, 'BAD_AUTHORIZATION');

  next();
}

// API ROUTER
const r = new express.Router();

// Err injection
r.use(Err);

// API middleware
r.use(cors());
r.use(bp.json());
r.use(bp.urlencoded({ extended: true }));

/* \/ unauthenticated requests \/ */

// here

/* /\ unauthenticated requests /\ */
r.use(auth);
/* \/  authenticated requests  \/ */

r.delete('/invoice/:number', async (req, res) => {
  const invoice = await Invoice.findOne({ number: req.params.number });
  if (!invoice) return res.err(404, 'INVOICE_NOT_FOUND');

  await invoice.remove();
  res.json({ deleted: true });
});

r.patch('/invoice/:number', async (req, res) => {
  if (!(req.body && req.body.url)) return res.err(400, 'MISSING_URL');
  const { url } = req.body;

  const invoice = await Invoice.findOne({ number: req.params.number });
  if (!invoice) return res.err(404, 'INVOICE_NOT_FOUND');

  invoice.url = url;
  const out = await invoice.save();
  res.json({ invoice: (({ number, url }) => ({ number, url }))(out) });
});

r.post('/new', async (req, res) => {
  if (!(req.body && req.body.number && req.body.url))
    return res.err(400, 'MISSING_INFORMATION');

  const { number, url } = req.body;
  if (await Invoice.findOne({ number })) return res.err(409, 'ALREADY_EXISTS');
  const invoice = await Invoice({ number, url }).save();

  res.json({ invoice: (({ number, url }) => ({ number, url }))(invoice) });
});

module.exports = r;