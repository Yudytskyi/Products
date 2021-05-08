const _ = require('lodash');

function getValueByKey(object, requiredKey) {
  const buffer = {};
  if (_.isArray(object)) {
    object.forEach(el => getValueByKey(el, requiredKey));
  }

  if (_.isObject(object)) {
    if (Object.getOwnPropertyDescriptor(object, requiredKey)) {
      return (buffer[requiredKey] = object[requiredKey]);
    }
    Object.keys(object)
      .filter(key => key.charAt(0) !== '_')
      .some(key => {
        buffer[requiredKey] = getValueByKey(object[key], requiredKey);
        return buffer[requiredKey] !== undefined ? true : false;
      });
  }

  return buffer[requiredKey];
}

function getValueByKeys(object, requiredKeys, returnType) {
  const buffer = [];
  keys = _.isArray(requiredKeys) ? requiredKeys : [requiredKeys];

  keys.forEach(key => {
    const value = getValueByKey(object, key);
    if (value === undefined) {
      return;
    }
    buffer.push(
      _.isArray(returnType)
        ? [key, value]
        : _.isObject(returnType)
        ? Object.fromEntries([[key, value]])
        : value
    );
  });
  return buffer.length === 1 ? buffer[0] : buffer;
}

module.exports = getValueByKeys;
