const createHttpError = require('http-errors');
const { RefreshToken } = require('../../models');
const { AuthService } = require('../../services');

const refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });
    if (refreshTokenInstance && refreshTokenInstance.isUnexpired()) {
      const data = await AuthService.refreshSession(refreshTokenInstance);
      res.send({
        data,
      });
      return;
    }
    next(createHttpError(401));
  } catch (err) {
    next(err);
  }
};

module.exports = refresh;
