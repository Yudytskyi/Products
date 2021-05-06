const _ = require('lodash');

function getValueByKey(obj, requiredKey, buffer = {}) {
  if (_.isArray(obj)) {
    obj.some(value => {
      getValueByKey(value, requiredKey, buffer);
      return true;
    });
    return buffer;
  }

  if (_.isObject(obj)) {
    const res = Object.getOwnPropertyDescriptor(obj, requiredKey);
    if (res && !buffer[requiredKey]) {
      buffer[requiredKey] = obj[requiredKey];
      return buffer[requiredKey];
    }
    getValueByKey(Object.values(obj), requiredKey, buffer);
  }
  return buffer[requiredKey];
}

function getValueByKeys(obj, requiredKeys, buffer = {}) {
  keys = _.isArray(requiredKeys) ? requiredKeys : [requiredKeys];

  keys.forEach(requiredKey => {
    const res = getValueByKey(obj, requiredKey);
    res ? (buffer[requiredKey] = res) : undefined;
  });
  return buffer;
}

module.exports = getValueByKeys;
