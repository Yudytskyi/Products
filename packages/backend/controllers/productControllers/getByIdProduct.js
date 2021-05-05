const _ = require('lodash');

const { Product, ProductType, Attribute } = require('../../models');
const { prepareProduct } = require('../../services');

const getById = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    const { dataValues: product } = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });

    if (product) {
      const typeName = product.ProductTypes[0].dataValues.typeName;
      const attributes = product.Attributes[0].dataValues;

      const preparedProduct = prepareProduct(
        productId,
        product.name,
        typeName,
        attributes
      );

      res.status(200).send({ data: preparedProduct });
    } else {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = getById;
