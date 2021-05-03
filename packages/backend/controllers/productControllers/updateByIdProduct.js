const getByIdProduct = require('./getByIdProduct');

const {
  sequelize,
  Product,
  ProductType,
  ProductInType,
} = require('../../models');
const createError = require('http-errors');
const _ = require('lodash');

const {
  db: {
    fields: { includesFields, excludesFields },
  },
} = require('../../config/db.json');

const updateByIdProducts = async (req, res, next) => {
  const {
    body: {
      data: { name, typeName, attributes },
    },
    params: { productId },
  } = req;
  try {
    const productInstance = await Product.findByPk(productId);
    if (!productInstance) {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }
    const productTypeInstance = await ProductType.findOne({
      where: { type_name: typeName },
    });
    const productTypeId = productTypeInstance.get('id');
    const productInTypeInstance = await ProductInType.findOne({
      where: { product_id: productTypeId },
    });

    if (name) {
      productInstance.name = name;
    }
    if (typeName) {
      productInTypeInstance.productTypeId = productTypeId;
    }

    if (attributes) {
      includesFields.forEach(field => {
        if (attributes[field]) {
          productInTypeInstance[field] = attributes[field];
        }
      });

      await productInstance.save();
      await productInTypeInstance.save();

      const req = { params: { productId } };
      await getByIdProduct(req, res, next);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = updateByIdProducts;
