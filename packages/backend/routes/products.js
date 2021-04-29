const { Router } = require('express');
const productsController = require('../controllers/products');
const { validateProduct } = require('../middlewares');
const productsRouter = Router();

productsRouter.post(
  '/product',
  validateProduct.validateOnCreate,
  productsController.create
);

productsRouter
  .route('/product/:productId')
  .get(productsController.getById)
  .put(validateProduct.validateOnUpdate, productsController.updateById)
  .delete(productsController.deleteById);

productsRouter
  .route('/products')
  .get(productsController.getMany)
  .delete(productsController.bulkDelete);

module.exports = productsRouter;
