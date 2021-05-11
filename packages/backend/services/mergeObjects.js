const _ = require('lodash');
const getValueByKeys = require('./getValueByKeys');

function mergeAllFieldsObjects(object, updateDataObject) {
  const newObject = {};
  Object.keys(object)
    .filter(key => key.charAt(0) !== '_')
    .forEach(key => {
      _.isObject(object[key])
        ? (newObject[key] = mergeAllFieldsObjects(
            object[key],
            updateDataObject[key]
          ))
        : (newObject[key] =
            getValueByKeys(updateDataObject, key) ??
            getValueByKeys(object, key));
    });
  return newObject;
}

const mergeObjects = (object, updateDataObject) => {
  const mergedObjects = mergeAllFieldsObjects(object, updateDataObject);

  switch (mergedObjects.productType.typeName) {
    case 'phone': {
      mergedObjects.attributes.graphicsCard = null;
      break;
    }
    case 'tablet': {
      mergedObjects.attributes.graphicsCard = null;
      mergedObjects.attributes.dualSim = null;
      break;
    }
    case 'laptop': {
      mergedObjects.attributes.dualSim = null;
      break;
    }
    default:
      break;
  }
  return mergedObjects;
};

module.exports = mergeObjects;
