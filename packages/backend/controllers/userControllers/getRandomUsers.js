const axios = require('axios');
const { UserModel } = require('../../classes');
const _ = require('lodash');
const getValueByKeys = require('../../services/getValueByKeys');
const { db } = require('./../../configs/db.json');
const { randomUserFields, role: usersRoles } = getValueByKeys(
  db,
  ['randomUserFields', 'role'],
  {}
);

const getRandomUsers = async (req, res, next) => {
  const {
    params: { numberOfUsers },
  } = req;
  try {
    const users = [];
    const randomUserFieldsString = randomUserFields.join().toString();
    const {
      data: { results: randomUsers },
    } = await axios.get(
      `https://randomuser.me/api/?results=${numberOfUsers}&inc=${randomUserFieldsString}`
    );

    randomUsers.map(user => {
      const {
        name: { first: firstName, last: lastName },
        email,
        login: { username: userName, password },
      } = user;

      const random = _.random(0, usersRoles.length - 1);
      const role = usersRoles[random];
      const randomUser = new UserModel({
        firstName,
        lastName,
        userName,
        email,
        role,
      });
      const newUser = randomUser.preparedUser;
      newUser.user.password = password;

      users.push(newUser);
    });

    users.length
      ? ((req.body = { data: users }), next())
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = getRandomUsers;
