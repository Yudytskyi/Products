'use strict';
const _ = require('lodash');

module.exports = obj => {
  return _(obj)
    .pickBy(_.isObject)
    .mapValues(removeEmptyObjects)
    .omitBy(_.isEmpty)
    .assign(_.omitBy(obj, _.isObject))
    .value();
};
