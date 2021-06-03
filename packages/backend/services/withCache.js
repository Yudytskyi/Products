const Redis = require('ioredis');
const RedisAdaptor = require('sequelize-transparent-cache-ioredis');

const redis = new Redis();
const redisAdaptor = new RedisAdaptor({
  client: redis,
  namespace: 'model',
  lifetime: 60 * 60,
});

const sequelizeCache = require('sequelize-transparent-cache');
const { withCache } = sequelizeCache(redisAdaptor);

module.exports = withCache;
