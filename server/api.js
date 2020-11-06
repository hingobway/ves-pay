const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const Err = require('./err');
const harvest = require('./harvest');

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

// PREPARE INVOICE
const prep = ({ number, url, paid }) => ({ number, url, paid });

// API ROUTER
const r = new express.Router();

// Err injection
r.use(Err);

// API middleware
r.use(cors());
r.use(bp.json());
r.use(bp.urlencoded({ extended: true }));

/* \/ unauthenticated requests \/ */

r.get('/harvest/fromurl', async (req, res) => {
  if (!(req.query && req.query.url)) return res.err(400, 'MISSING_URL');
  const number = await harvest(req.query.url);
  if (!number) return res.err(400, 'UNABLE_TO_CRAWL_URL');
  res.json({ number });
});

r.get('/invoice/:number', async (req, res) => {
  const invoice = await Invoice.findOne({ number: req.params.number });
  if (!invoice) return res.err(404, 'INVOICE_NOT_FOUND');

  res.json({ invoice: prep(invoice) });
});

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
  res.json({ invoice: prep(out) });
});

r.patch('/paid/:number', async (req, res) => {
  const invoice = await Invoice.findOne({ number: req.params.number });
  if (!invoice) return res.err(404, 'INVOICE_NOT_FOUND');

  invoice.paid = true;
  const out = await invoice.save();
  res.json({ invoice: prep(out) });
});
r.patch('/unpaid/:number', async (req, res) => {
  const invoice = await Invoice.findOne({ number: req.params.number });
  if (!invoice) return res.err(404, 'INVOICE_NOT_FOUND');

  invoice.paid = false;
  const out = await invoice.save();
  res.json({ invoice: prep(out) });
});

r.post('/new/fromurl', async (req, res) => {
  if (!(req.body && req.body.url)) return res.err(400, 'MISSING_URL');

  const { url } = req.body;
  if (await Invoice.findOne({ url })) return res.err(409, 'ALREADY_EXISTS');

  const number = await harvest(url);
  if (!number) return res.err(400, 'UNABLE_TO_CRAWL_URL');

  const invoice = await Invoice({ number, url }).save();

  res.json({ invoice: prep(invoice) });
});

r.post('/new', async (req, res) => {
  if (!(req.body && req.body.number && req.body.url))
    return res.err(400, 'MISSING_INFORMATION');

  const { number, url } = req.body;
  if (await Invoice.findOne({ number })) return res.err(409, 'ALREADY_EXISTS');
  const invoice = await Invoice({ number, url }).save();

  res.json({ invoice: prep(invoice) });
});

module.exports = r;
