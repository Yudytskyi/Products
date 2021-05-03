const createError = require('http');
const _ = require('lodash');

const { productCreateSchema } = require('./schemas');
const {
  db: {
    productTypes: { typeName: productTypeNames },
  },
} = require('../config/db.json');

const validateOnUpdateProduct = async ({ body }, res, next) => {
  try {
    next();
  } catch (err) {}
};

module.exports = validateOnUpdateProduct;
