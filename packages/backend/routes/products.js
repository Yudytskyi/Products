const { Router } = require('express');
const {
  createProduct,
  getByIdProduct,
  getAllProducts,
  updateByIdProduct,
  deleteByIdProduct,
  deleteAllProducts,
} = require('../controllers');

const { validateProduct } = require('../middlewares');

const productsRouter = Router();

productsRouter.post('/product', validateProduct.onCreate, createProduct);

productsRouter
  .route('/product/:productId')
  .get(getByIdProduct)
  .patch(getByIdProduct, validateProduct.onUpdate, updateByIdProduct)
  .delete(deleteByIdProduct);

productsRouter.route('/products').get(getAllProducts).delete(deleteAllProducts);

module.exports = productsRouter;
