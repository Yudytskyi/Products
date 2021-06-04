const express = require('express');
const cors = require('cors');
const router = require('./router');

const { errorHandler } = require('./middlewares');
const { version } = require('./package.json');

const app = express();

app.use(cors());

app.use(express.json());

app.use(`/api/${version}`, router);

app.use(errorHandler);

module.exports = app;
