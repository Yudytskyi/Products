const createError = require('http-errors');
const { ProductType } = require('../../models');
const { ProductTypeModel } = require('../../classes');

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
    const newProductType = new ProductTypeModel(productTypeInstance);

    productTypeInstance
      ? res.status(201).send({
          data: newProductType.preparedProductType,
        })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = createProductType;
