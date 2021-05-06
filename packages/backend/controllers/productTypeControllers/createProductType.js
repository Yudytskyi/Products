const { ProductType } = require('../../models');
const createError = require('http-errors');
const { prepareProductsTypes } = require('../../services');

const createProductType = async (req, res, next) => {
  const {
    body: {
      data: { typeName },
    },
  } = req;

  try {
    const productTypeInstance = await ProductType.create({ typeName });

    productTypeInstance
      ? res
          .status(201)
          .send({ data: prepareProductsTypes(productTypeInstance) })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = createProductType;
