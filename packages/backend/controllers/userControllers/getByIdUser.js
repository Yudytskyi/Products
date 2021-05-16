const { User } = require('../../models');
const { prepareObjects } = require('../../services');
const {
  db: { modelPreparedUser },
} = require('../../config/db.json');

const getByIdUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    const foundUser = await User.findByPk(userId);

    foundUser
      ? res.status(200).send({
          data: prepareObjects(foundUser, modelPreparedUser),
        })
      : res.status(404).send(`User by id: ${userId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = getByIdUser;
