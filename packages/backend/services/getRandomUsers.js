const axios = require('axios');
const {
  db: { randomUserFields },
} = require('./../config/db.json');

const getRandomUsers = async ({ numberOfUsers }) => {
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
    const random = Math.random();
    const role = random < 0.1 ? 'admin' : random < 0.8 ? 'user' : 'guest';
    if (email) {
      users.push({ firstName, lastName, userName, password, email, role });
    }
  });

  return users;
};

module.exports = getRandomUsers;
