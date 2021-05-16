const createError = require('http-errors');
const { User } = require('../../models');
const { getRandomUsers } = require('../../services');

const bulkCreateUsers = async (req, res, next) => {
  const {
    params: { numberOfUsers },
  } = req;
  try {
    const users = await getRandomUsers({ numberOfUsers });
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
