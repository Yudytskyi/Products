const axios = require('axios');
const _ = require('lodash');
const {
  db: { randomUserFields, usersRoles },
} = require('./../../config/db.json');

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

      if (email) {
        users.push({ firstName, lastName, userName, password, email, role });
      }
    });

    users.length
      ? ((req.body = { data: users }), next())
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = getRandomUsers;
