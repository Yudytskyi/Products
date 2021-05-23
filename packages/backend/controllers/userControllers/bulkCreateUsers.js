const createError = require('http-errors');
const { User } = require('../../models');
const { UserModel } = require('../../classes');

const bulkCreateUsers = async (req, res, next) => {
  const {
    body: { data },
  } = req;
  try {
    const users = data.map(user => {
      const newUser = new UserModel(user);
      return newUser.userData;
    });
    const userTypeInstance = await User.bulkCreate(users);

    userTypeInstance.length
      ? res
          .status(201)
          .send({ message: `Created ${userTypeInstance.length} user(s).` })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = bulkCreateUsers;
