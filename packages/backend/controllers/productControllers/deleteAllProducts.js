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

const deleteAllProduct = async (req, res, next) => {
  const {} = req;
  try {
    res.status(200).send(`All product is deleted`);
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAllProduct;
