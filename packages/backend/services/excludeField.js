const _ = require('lodash');

module.exports = (data, fieldNames = ['updatedAt', 'createdAt']) => {
  if (_.isArray(data)) {
    const result = [];
    data.forEach(product => {
      result.push(_.omit(product?.get(), fieldNames));
    });
    return result;
  }
  return _.omit(data?.get(), fieldNames);
};
