const createError = require('http-errors');
const { User } = require('../../models');
const { prepareObjects } = require('../../services');
const {
  db: { modelPreparedUser },
} = require('../../config/db.json');

const createUser = async (req, res, next) => {
  const {
    body: {
      data: { user },
    },
  } = req;

  try {
    const uerTypeInstance = await User.create(user);

    uerTypeInstance
      ? res.status(201).send({
          data: prepareObjects(uerTypeInstance, modelPreparedUser),
        })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = createUser;
