const _ = require('lodash');
const { getValueByKeys } = require('../services/index');

const {
  db: { modelPreparedProductType, productTypeFields },
} = require('../configs/db.json');

function createPreparedProductType(data, model = modelPreparedProductType) {
  const preparedUser = {};
  Object.keys(model).forEach(key => {
    preparedUser[key] =
      _.isObject(model[key]) && !_.isArray(model[key])
        ? createPreparedProductType(data, model[key])
        : getValueByKeys(data, key);
  });

  return preparedUser;
}

class ProductTypeModel extends Object {
  constructor(data) {
    super();

    productTypeFields.forEach(field => {
      const value = getValueByKeys(data, field);
      if (value !== undefined) {
        this[field] = value;
      }
    });
  }

  get preparedProductType() {
    return createPreparedProductType(this);
  }

  get productTypeData() {
    const productTypeData = {};
    productTypeFields.forEach(field => {
      const value = getValueByKeys(this, field);
      if (value !== undefined) {
        productTypeData[field] = value;
      }
    });
    return productTypeData;
  }

  set(field, value) {
    this[field] = value;
  }
}

module.exports = ProductTypeModel;
