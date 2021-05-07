const _ = require('lodash');
const getValueByKeys = require('./getValueByKeys');

function prepareObjects(objects = {}, schema = {}) {
  const preparedObjects = [];
  const arrayOfObjects = _.isArray(objects) ? objects : [objects];

  arrayOfObjects.forEach(object => {
    const preparedObject = Object.fromEntries(getValueByKeys(object, schema));
    preparedObject ? preparedObjects.push(preparedObject) : false;
  });
  return preparedObjects;
}

module.exports = prepareObjects;
