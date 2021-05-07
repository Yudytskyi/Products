const _ = require('lodash');

function getValueByKey(object, requiredKey) {
  const buffer = {};
  if (_.isArray(object)) {
    object.forEach(el => getValueByKey(el, requiredKey));
  }

  if (_.isObject(object)) {
    Object.getOwnPropertyDescriptor(object, requiredKey)
      ? (buffer[requiredKey] = object[requiredKey])
      : Object.keys(object)
          .filter(key => key.charAt(0) !== '_')
          .forEach(key => {
            if (!buffer[requiredKey]) {
              return key === requiredKey
                ? (buffer[requiredKey] = object[key])
                : (buffer[requiredKey] = getValueByKey(
                    object[key],
                    requiredKey
                  ));
            }
          });
  }
  return buffer[requiredKey];
}

function getValueByKeys(object, requiredKeys) {
  const buffer = [];
  keys = _.isArray(requiredKeys) ? requiredKeys : [requiredKeys];

  keys.forEach(key => {
    const value = getValueByKey(object, key);
    value ? buffer.push([key, value]) : undefined;
  });
  return buffer;
}

module.exports = getValueByKeys;
