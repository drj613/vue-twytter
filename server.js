const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));
// Serving production-compiled files
app.use(serveStatic(__dirname + '/dist'));
// Prevents router issues related to using history (src/router/index.js)
app.use(history());

app.listen(process.env.PORT || 5000);