const { Router } = require('express');
const {
  createProductType,
  getByIdProductType,
  deleteByIdProductType,
  getAllProductTypes,
  deleteAllProductTypes,
} = require('../controllers');
const { validateOnCreateProduct } = require('../middlewares');
const productTypesRouter = Router();

productTypesRouter
  .route('/productType')
  .post(validateOnCreateProduct, createProductType);

productTypesRouter
  .route('/productType/:productTypeId')
  .get(getByIdProductType)
  .delete(deleteByIdProductType);

productTypesRouter
  .route('/productTypes')
  .get(getAllProductTypes)
  .delete(deleteAllProductTypes);

module.exports = productTypesRouter;
