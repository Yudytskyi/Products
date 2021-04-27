const { Router } = require('express');
const productsController = require('../controllers/products');
const { validateProduct } = require('../middlewares');
const productsRouter = Router();

productsRouter.post(
  '/product',
  // validateProduct.validateOnCreate,
  productsController.create
);

productsRouter
  .route('/product/:productId')
  .get(productsController.getById)
  .put(validateProduct.validateOnUpdate, productsController.updateById)
  .delete(productsController.deleteProductById);

productsRouter
  .route('/products')
  .post(productsController.bulkCreate)
  .get(productsController.getMany)
  .delete(productsController.bulkDeleteProduct);

module.exports = productsRouter;
