const _ = require('lodash');

function getValueByKeys(obj, requiredKeys) {
  const results = {};
  var res = Symbol();

  function getValueByKey(obj, requiredKey) {
    if (_.isArray(obj)) {
      obj.forEach(value => {
        getValueByKey(value, requiredKey);
      });
      return _.isSymbol(res) ? undefined : res;
    }

    if (_.isObject(obj)) {
      Object.keys(obj)
        .filter(key => key.charAt(0) !== '_')
        .forEach(key => {
          if (_.isSymbol(res)) {
            key === requiredKey
              ? (res = obj[key])
              : getValueByKey(obj[key], requiredKey);
          }
        });
    }
    return _.isSymbol(res) ? undefined : res;
  }

  keys = _.isArray(requiredKeys) ? requiredKeys : [requiredKeys];

  keys.forEach(requiredKey => {
    results[requiredKey] = getValueByKey(obj, requiredKey);
    res = Symbol();
  });
  return results;
}

module.exports = getValueByKeys;
