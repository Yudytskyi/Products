const { userCreateSchema } = require('./schemas');

const validateUserOnCreate = async (req, res, next) => {
  const { body } = req;
  try {
    await userCreateSchema.validate(body);

    next();
  } catch (err) {
    res.status(400).send({ message: err.message ?? massage });
  }
};

module.exports = validateUserOnCreate;
