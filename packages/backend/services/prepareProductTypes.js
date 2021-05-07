const _ = require('lodash');
const getValueByKeys = require('./getValueByKeys');

function prepareProductTypes(objects) {
  const prepareProductsArray = [];
  arrayOfObjects = _.isArray(objects) ? objects : [objects];

  arrayOfObjects.forEach(obj => {
    const { productId } = getValueByKeys(obj, 'productId');
    const { name } = getValueByKeys(obj, 'name');
    const { typeName } = getValueByKeys(obj, 'typeName');
    const attributes = getValueByKeys(obj, includesFields);

    const prepareProduct = {
      productId,
      name,
      typeName,
      attributes,
    };
    prepareProductsArray.push(prepareProduct);
  });
  return prepareProductsArray;
}

module.exports = prepareProductTypes;
