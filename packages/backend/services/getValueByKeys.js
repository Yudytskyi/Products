const _ = require('lodash');

var res = {};

function getValueByKeys(obj, requiredKeys) {
  keys = _.isArray(requiredKeys) ? requiredKeys : [requiredKeys];

  keys.forEach(requiredKey => {
    if (_.isArray(obj)) {
      obj.forEach(element => {
        getValueByKeys(element, requiredKey);
      });
      return res;
    }

    if (_.isObject(obj)) {
      for (const key in obj) {
        if (res[requiredKey]) break;

        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key];
          key === requiredKey
            ? (res[requiredKey] = element)
            : getValueByKeys(element, requiredKey);
        }
      }
    }
  });
  return res;
}

module.exports = getValueByKeys;
