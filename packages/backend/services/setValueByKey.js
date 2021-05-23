const _ = require('lodash');

function setValueByKey(object, targetKey, value = null) {
  if (_.isArray(object)) {
    object.forEach(el => setValueByKey(el, targetKey, value));
  }

  if (_.isObject(object)) {
    if (Object.getOwnPropertyDescriptor(object, targetKey)) {
      object[targetKey] = value;
    }
    Object.keys(object)
      .filter(key => key.charAt(0) !== '_')
      .forEach(key => {
        key === targetKey
          ? (object[targetKey] = value)
          : setValueByKey(object[key], targetKey, value);
      });
  }

  return object;
}

module.exports = setValueByKey;
