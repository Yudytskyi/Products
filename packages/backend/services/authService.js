const _ = require('lodash');
const { v4: uuidV4 } = require('uuid');
const { Sequelize } = require('../models');
const JwtService = require('./jwtService');
const {
  tokenExpiresIn,
  tokenSecret,
  LIMIT_USED_DEVICES,
  REFRESH_TOKEN_EXP,
} = require('../config/jwt');

function prepareUser(userInstance) {
  const userDataValues = userInstance.get();
  return _.omit(userDataValues, ['password']);
}

async function createTokenPair(userInstance) {
  return {
    accessToken: await JwtService.sign(
      {
        userId: userInstance.get('id'),
        userRole: userInstance.get('role'),
      },
      tokenSecret,
      {
        expiresIn: tokenExpiresIn,
      }
    ),
    refreshToken: {
      token: uuidV4(),
      expiredIn: Sequelize.literal(
        `CURRENT_TIMESTAMP + '${REFRESH_TOKEN_EXP}'::interval`
      ),
    },
  };
}

exports.createSession = async userInstance => {
  const { accessToken, refreshToken } = await createTokenPair(userInstance);
  const countUsedDevices = await userInstance.countRefreshTokens();

  if (countUsedDevices >= LIMIT_USED_DEVICES) {
    const [oldestUserRefreshTokenInstance] =
      await userInstance.getRefreshTokens({
        order: [['updatedAt', 'ASC']],
      });
    await oldestUserRefreshTokenInstance.update(refreshToken);
  } else {
    await userInstance.createRefreshToken(refreshToken);
  }
  return {
    user: prepareUser(userInstance),
    tokenPair: {
      accessToken,
      refreshToken: refreshToken.token,
    },
  };
};

exports.refreshSession = async refreshTokenInstance => {
  const userInstance = await refreshTokenInstance.getUser();

  const { accessToken, refreshToken } = await createTokenPair(userInstance);
  await refreshTokenInstance.update(refreshToken);

  return {
    user: prepareUser(userInstance),
    tokenPair: {
      accessToken,
      refreshToken: refreshToken.token,
    },
  };
};
