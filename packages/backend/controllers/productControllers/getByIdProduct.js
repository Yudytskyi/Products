const { sequelize, Product, ProductType } = require('../../models');
const createError = require('http-errors');
const _ = require('lodash');

const {
  db: {
    fields: { includesFields, excludesFields },
  },
} = require('../../config/db.json');

const include = [
  {
    model: ProductType,
    as: 'product_types',
    attributes: ['id', 'type_name'],
    returning: true,
    through: {
      attributes: includesFields,
    },
  },
];

const getById = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    const productInstance = await Product.findByPk(productId, {
      attributes: ['id', 'name'],
      include,
    });

    if (productInstance) {
      const productData = productInstance.dataValues;
      const productTypeData = productData.product_types[0].dataValues;
      const attributesData = productTypeData.ProductInType.dataValues;

      const prepareProducts = {
        productId: productData.id,
        name: productData.name,
        typeName: productTypeData.type_name,
        ...attributesData,
      };
      res.status(200).send({ data: prepareProducts });
    } else {
      res.status(400).send(`Product by id:${productId} does not exist`);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = getById;
