const getValueByKeys = require('./getValueByKeys');
const {
  db: {
    fields: { includesFields },
  },
} = require('../config/db.json');

const prepareProduct = object =>
  getValueByKeys(object, ['productId', 'name', 'typeName', ...includesFields]);

module.exports = prepareProduct;
