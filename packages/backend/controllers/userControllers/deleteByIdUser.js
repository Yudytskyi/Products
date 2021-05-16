const { User } = require('../../models');

const deleteByIdUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const userInstance = await User.findByPk(userId);

    userInstance
      ? (await userInstance.destroy()) &&
        res.status(200).send(`User by id:${userId} deleted`)
      : res.status(404).send(`User by id: ${userId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteByIdUser;
