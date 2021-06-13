const jwt = {
  tokenExpiresIn: process.env.ACCESS_TOKEN_EXP ?? '30m',
  tokenSecret: process.env.ACCESS_TOKEN_SECRET ?? 'access token secret value',
  SALT_ROUNDS: process.env.SALT_ROUNDS ?? 5,
  LIMIT_USED_DEVICES: process.env.LIMIT_USED_DEVICES ?? 3,
  REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP ?? '10 days',
  passwordRule: [
    /(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])^.{8,255}$/,
    'Your password must be at least 8 characters, and include at least one lowercase letter, one uppercase letter, and a number. ',
  ],
};

module.exports = jwt;
