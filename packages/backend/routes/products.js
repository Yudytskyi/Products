const { Router } = require('express');
const {
  createProduct,
  getByIdProduct,
  getAllProducts,
  updateByIdProduct,
  deleteByIdProduct,
  deleteAllProducts,
} = require('../controllers');

const {
  validateOnCreateProduct,
  validateOnUpdateProduct,
} = require('../middlewares');

const productsRouter = Router();

productsRouter.post('/product', validateOnCreateProduct, createProduct);

productsRouter
  .route('/product/:productId')
  .get(getByIdProduct)
  .patch(validateOnUpdateProduct, updateByIdProduct)
  .delete(deleteByIdProduct);

productsRouter.route('/products').get(getAllProducts).delete(deleteAllProducts);

module.exports = productsRouter;
