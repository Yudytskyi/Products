const _ = require('lodash');
const getValueByKeys = require('./getValueByKeys');

function createObjectFromModel(sourceObject, protoObject) {
  const targetObject = {};
  Object.keys(protoObject).forEach(key => {
    targetObject[key] = _.isObject(protoObject[key])
      ? createObjectFromModel(sourceObject, protoObject[key])
      : getValueByKeys(sourceObject, key);
  });
  return targetObject;
}

function prepareObjects(objects, protoObject) {
  const preparedObjects = [];
  const arrayOfObjects = _.isArray(objects) ? objects : [objects];

  arrayOfObjects.forEach(object => {
    preparedObjects.push(createObjectFromModel(object, protoObject));
  });
  return preparedObjects?.length === 1 ? preparedObjects[0] : preparedObjects;
}

module.exports = prepareObjects;
