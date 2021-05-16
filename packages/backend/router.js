const { Router } = require('express');
const { productsRouter, productTypesRouter, userRouter } = require('./routes');
const router = Router();

module.exports = router.use(productsRouter, productTypesRouter, userRouter);
