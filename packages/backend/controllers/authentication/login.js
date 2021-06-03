const createHttpError = require('http-errors');
const { User } = require('../../models');
const { AuthService } = require('../../services');

const login = async (req, res, next) => {
  try {
    const {
      body: {
        data: [
          {
            user: { password, email },
          },
        ],
      },
    } = req;

    const userInstance = await User.cache().findOne({
      where: { email },
    });

    if (userInstance && (await userInstance.comparePassword(password))) {
      const data = await AuthService.createSession(userInstance);
      res.status(201).send({
        data,
      });
      return;
    }
    next(createHttpError(403, 'Incorrect password or email'));
  } catch (err) {
    next(err);
  }
};

module.exports = login;
