const _ = require('lodash');

function getValueByKeys(obj, requiredKeys) {
  const results = {};
  var res = undefined;

  function getValueByKey(obj, requiredKey) {
    if (_.isArray(obj)) {
      obj.forEach(value => {
        getValueByKey(value, requiredKey);
      });
      return res;
    }

    if (_.isObject(obj)) {
      for (const key in obj) {
        if (res !== undefined) break;

        if (Object.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (key === requiredKey) {
            res = value;
            break;
          }
          getValueByKey(value, requiredKey);
        }
      }
    }
    return res;
  }

  keys = _.isArray(requiredKeys) ? requiredKeys : [requiredKeys];

  keys.forEach(requiredKey => {
    results[requiredKey] = getValueByKey(obj, requiredKey);
  });
  return results;
}

module.exports = getValueByKeys;
