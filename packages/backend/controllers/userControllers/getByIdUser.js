const { User } = require('../../models');
const { UserModel } = require('../../classes');

const getByIdUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    const foundUser = await User.findByPk(userId);
    const user = new UserModel(foundUser);

    foundUser
      ? res.status(200).send({
          data: user.preparedUser,
        })
      : res.status(404).send(`User by id: ${userId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = getByIdUser;
