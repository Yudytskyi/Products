const express = require('express');
const cors = require('cors');
const router = require('./router');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const { errorHandler } = require('./middlewares');
const { npm_package_version } = process.env;
const { options } = require('./configs/swagger');
const specs = swaggerJsDoc(options);

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(`/api/${npm_package_version}`, router);

app.use(errorHandler);

module.exports = app;
