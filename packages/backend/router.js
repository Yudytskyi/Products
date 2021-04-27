const { Router } = require('express');
const { productsRouter, productTypesRouter } = require('./routes');
const router = Router();

module.exports = router.use(productsRouter, productTypesRouter);
