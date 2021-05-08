const _ = require('lodash');
const getValueByKeys = require('./getValueByKeys');
const { configDB } = require('../config/db.json');
const prepareProductFields = getValueByKeys(configDB, 'prepareProductFields');

function prepareProducts(objects) {
  const preparedProducts = [];
  const arrayOfObjects = _.isArray(objects) ? objects : [objects];

  arrayOfObjects.forEach(product => {
    const preparedProduct = Object.fromEntries(
      getValueByKeys(product, prepareProductFields)
    );
    product ? preparedProducts.push(preparedProduct) : false;
  });
  return preparedProducts;
}

module.exports = prepareProducts;
