const _ = require('lodash');
const getValueByKeys = require('./getValueByKeys');

function prepareProductTypes(objects) {
  const preparedProductTypesArray = [];
  const arrayOfObjects = _.isArray(objects) ? objects : [objects];

  arrayOfObjects.forEach(obj => {
    const { productTypeId } = getValueByKeys(obj, 'productTypeId');
    const { typeName } = getValueByKeys(obj, 'typeName');

    const prepareProduct = { productTypeId, typeName };
    preparedProductTypesArray.push(prepareProduct);
  });
  return preparedProductTypesArray;
}

module.exports = prepareProductTypes;
