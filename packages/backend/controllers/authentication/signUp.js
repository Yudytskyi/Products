const createHttpError = require('http-errors');
const { User } = require('../../models');
const AuthService = require('../../services');

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const userInstance = await User.create(body);
    if (userInstance) {
      const data = await AuthService.createSession(userInstance);
      res.status(201).send({
        data,
      });
      return;
    }
    next(createHttpError(401));
  } catch (err) {
    next(err);
  }
};

module.exports = signUp;
