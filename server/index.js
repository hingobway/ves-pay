const express = require('express');
const https = require('https');
const path = require('path');

require('./db');

const { PORT } = process.env;

const app = express();

app.get('/:number', async (req, res, next) => {
  if (!parseInt(req.params.number)) return next();
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.get('/qr', (_, res) =>
  res.sendFile(path.join(__dirname, '../build/index.html'))
);

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '../build')));

app.listen(PORT || 8080, () => console.log(`Listening on ${PORT || 8080}`));

// PING
setInterval(() => {
  https.get('https://pay.virtualensembleservices.com');
}, 200000);
