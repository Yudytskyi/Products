const _ = require('lodash');

const getAllFieldsOfObject = object => {
  const allFields = [];
  Object.keys(object)
    .filter(key => key.charAt(0) !== '_')
    .forEach(key => {
      _.isObject(object[key])
        ? allFields.push(...getAllFieldsOfObject(object[key]))
        : allFields.push(key);
    });
  return allFields;
};

module.exports = getAllFieldsOfObject;
