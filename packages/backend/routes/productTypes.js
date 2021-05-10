const { Router } = require('express');
const {
  createProductType,
  getByIdProductType,
  deleteByIdProductType,
  getAllProductTypes,
  deleteAllProductTypes,
} = require('../controllers');
const { validateProduct } = require('../middlewares');
const productTypesRouter = Router();

productTypesRouter
  .route('/productType')
  .post(validateProduct.onCreate, createProductType);

productTypesRouter
  .route('/productType/:productTypeId')
  .get(getByIdProductType)
  .delete(deleteByIdProductType);

productTypesRouter
  .route('/productTypes')
  .get(getAllProductTypes)
  .delete(deleteAllProductTypes);

module.exports = productTypesRouter;
