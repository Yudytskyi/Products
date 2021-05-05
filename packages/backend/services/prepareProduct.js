const _ = require('lodash');
const {
  db: {
    fields: { includesFields },
  },
} = require('../config/db.json');

const prepareProduct = (productId, name, typeName, attributes) => ({
  productId,
  name,
  typeName,
  ..._.pick(attributes, includesFields),
});

module.exports = prepareProduct;
