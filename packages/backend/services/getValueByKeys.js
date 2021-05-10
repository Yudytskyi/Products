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

function getValueByKeys(object, requiredKeys, responseType) {
  var buffer, responseTypeString;

  if (_.isArray(responseType)) {
    responseTypeString = 'array';
    buffer = [];
  } else {
    if (_.isObject(responseType)) {
      responseTypeString = 'object';
      buffer = {};
    }
  }

  keys = _.isArray(requiredKeys) ? requiredKeys : [requiredKeys];

  keys.forEach(key => {
    const value = getValueByKey(object, key);
    if (value === undefined) {
      return;
    }
    switch (responseTypeString) {
      case 'array':
        buffer.push([key, value]);
        break;
      case 'object':
        buffer[key] = value;
        break;
      default:
        buffer = value;
    }
  });
  return buffer?.length === 1 && _.isArray(buffer) ? buffer[0] : buffer;
}

module.exports = getValueByKeys;
