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

const deleteByIdProducts = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    res.status(200).send(`Product by id:${productId} deleted`);
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteByIdProducts;
