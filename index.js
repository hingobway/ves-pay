const express = require('express');
const https = require('https');

require('./db');

const { PORT } = process.env;

const app = express();

app.use(require('./pay'));

app.use('/api', require('./api'));

app.use((_, res) => res.redirect('https://virtualensembleservices.com/'));

app.listen(PORT || 8080, () => console.log(`Listening on ${PORT || 8080}`));

// PING
setInterval(() => {
  https.get('https://pay.virtualensembleservices.com');
}, 200000);
