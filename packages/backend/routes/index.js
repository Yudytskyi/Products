module.exports.routes = [
  (productsRouter = require('./products')),
  (productTypesRouter = require('./productTypes')),
  (userRouter = require('./users')),
  (authRouter = require('./auth')),
];
