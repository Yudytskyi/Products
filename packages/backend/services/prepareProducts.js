const _ = require('lodash');
const getValueByKeys = require('./getValueByKeys');
const {
  db: {
    fields: { prepareProductFields },
  },
} = require('../config/db.json');

function prepareProducts(objects) {
  const preparedProducts = [];
  const arrayOfObjects = _.isArray(objects) ? objects : [objects];

  arrayOfObjects.forEach(product => {
    const preparedProduct = Object.fromEntries(
      getValueByKeys(product, prepareProductFields)
    );
    product ? preparedProducts.push(product) : false;
  });
  return preparedProducts;
}

module.exports = prepareProducts;
