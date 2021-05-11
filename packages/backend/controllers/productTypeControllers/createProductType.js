const createError = require('http-errors');
const { ProductType } = require('../../models');
const { prepareObjects } = require('../../services');
const {
  db: { modelPreparedProductType },
} = require('../../config/db.json');

const createProductType = async (req, res, next) => {
  const {
    body: {
      data: {
        productType: { typeName },
      },
    },
  } = req;

  try {
    const productTypeInstance = await ProductType.create({ typeName });

    productTypeInstance
      ? res.status(201).send({
          data: prepareObjects(productTypeInstance, modelPreparedProductType),
        })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = createProductType;
