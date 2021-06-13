const _ = require('lodash');
const { getValueByKeys, setValueByKey } = require('../services/index');

const {
  db: { modelPreparedProduct, productFields },
} = require('../configs/db.json');

function createPreparedProduct(data, model = modelPreparedProduct) {
  const preparedProduct = {};
  Object.keys(model).forEach(key => {
    preparedProduct[key] =
      _.isObject(model[key]) && !_.isArray(model[key])
        ? createPreparedProduct(data, model[key])
        : getValueByKeys(data, key);
  });

  return preparedProduct;
}

function productConstraints(preparedProduct) {
  const typeName = getValueByKeys(preparedProduct, 'typeName');
  if (typeName === 'phone') {
    setValueByKey(preparedProduct, 'graphicsCard');
  }
  if (typeName === 'tablet') {
    setValueByKey(preparedProduct, 'graphicsCard');
    setValueByKey(preparedProduct, 'dualSim');
  }
  if (typeName === 'laptop') {
    setValueByKey(preparedProduct, 'dualSim');
  }
  return preparedProduct;
}

class ProductModel extends Object {
  constructor(data) {
    super();

    productFields.forEach(field => {
      const value = getValueByKeys(data, field);
      if (value !== undefined) {
        this[field] = value;
      }
    });
  }

  get preparedProduct() {
    return productConstraints(createPreparedProduct(this));
  }

  set(field, value) {
    this[field] = value;
  }
}

module.exports = ProductModel;
