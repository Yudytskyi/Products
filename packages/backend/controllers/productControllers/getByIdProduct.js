const _ = require('lodash');

const { Product, ProductType, Attribute } = require('../../models');

const {
  db: {
    fields: { includesFields },
  },
} = require('../../config/db.json');

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

      const prepareProducts = {
        productId,
        name: product.name,
        typeName,
        ..._.pick(attributes, includesFields),
      };
      res.status(200).send({ data: prepareProducts });
    } else {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = getById;
