const _ = require('lodash');
const { getValueByKeys } = require('../services/index');

const {
  db: { modelPreparedUser, userFields },
} = require('../config/db.json');

function createPreparedUser(data, model = modelPreparedUser) {
  const preparedUser = {};
  Object.keys(model).forEach(key => {
    preparedUser[key] =
      _.isObject(model[key]) && !_.isArray(model[key])
        ? createPreparedUser(data, model[key])
        : getValueByKeys(data, key);
  });

  return preparedUser;
}

class UserModel extends Object {
  constructor(data) {
    super();

    userFields.forEach(field => {
      const value = getValueByKeys(data, field);
      if (value !== undefined) {
        this[field] = value;
      }
    });
  }

  get preparedUser() {
    return createPreparedUser(this);
  }

  get userData() {
    const userData = {};
    userFields.forEach(field => {
      const value = getValueByKeys(this, field);
      if (value !== undefined) {
        userData[field] = value;
      }
    });
    return userData;
  }

  set(field, value) {
    this[field] = value;
  }
}

module.exports = UserModel;
