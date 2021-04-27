const { Router } = require('express');
const typesController = require('../controllers/productTypes');
// const { validateProduct } = require('../middlewares');
const typesRouter = Router();

typesRouter.post(
  '/productType',
  // validateProduct.validateOnCreate,
  typesController.create
);

// typesRouter
//   .route('/productType/:productId')
//   .get(typesController.getById)
//   .put(validateProduct.validateOnUpdate, typesController.updateById)
//   .delete(typesController.deleteProductById);

typesRouter
  .route('/productTypes')
  .post(typesController.bulkCreate)
  .get(typesController.getMany)
  .delete(typesController.bulkDeleteProduct);

module.exports = typesRouter;
