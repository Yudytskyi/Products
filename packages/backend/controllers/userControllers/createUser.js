const createError = require('http-errors');
const { User } = require('../../models');
const { UserModel } = require('../../classes');

const createUser = async (req, res, next) => {
  const {
    body: {
      data: [{ user }],
    },
  } = req;

  try {
    const userTypeInstance = await User.create(user);

    const newUser = new UserModel(userTypeInstance);

    userTypeInstance
      ? res.status(201).send({
          data: newUser.preparedUser,
        })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = createUser;
