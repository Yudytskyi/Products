const _ = require('lodash');
const getValueByKeys = require('./getValueByKeys');
const {
  db: {
    fields: { includesFields },
  },
} = require('../config/db.json');

function prepareProducts(objects) {
  const preparedProductsArray = [];
  const arrayOfObjects = _.isArray(objects) ? objects : [objects];

  arrayOfObjects.forEach(obj => {
    const { id } = getValueByKeys(obj, 'id');
    const { name } = getValueByKeys(obj, 'name');
    const { typeName } = getValueByKeys(obj, 'typeName');
    const attributes = getValueByKeys(obj, includesFields);

    const prepareProduct = {
      id,
      name,
      typeName,
      attributes: _.isEmpty(attributes) ? undefined : attributes,
    };
    preparedProductsArray.push(prepareProduct);
  });
  return preparedProductsArray;
}

module.exports = prepareProducts;
