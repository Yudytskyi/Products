const { Router } = require('express');
const productTypesController = require('../controllers/productTypes');
const { validateProduct } = require('../middlewares');
const productTypesRouter = Router();

productTypesRouter
  .route('/productType')
  .post(validateProduct.validateOnCreate, productTypesController.create);

productTypesRouter
  .route('/productType/:productTypeId')
  .get(productTypesController.getById)
  .delete(productTypesController.deleteById);

productTypesRouter
  .route('/productTypes')
  .get(productTypesController.getMany)
  .delete(productTypesController.bulkDelete);

module.exports = productTypesRouter;
