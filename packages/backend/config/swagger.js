const { version } = require('../package.json');

const { NODE_ENV = 'development', npm_package_version } = process.env;
const {
  development: { defaultPORT },
} = require('../config/config.json');

module.exports.options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: npm_package_version,
      description: 'Products API Documentation',
    },
    servers: [
      {
        url: `http://localhost:${defaultPORT}/api/${npm_package_version}`,
      },
    ],
  },
  apis: ['./test-api/swagger/*.js'],
};
