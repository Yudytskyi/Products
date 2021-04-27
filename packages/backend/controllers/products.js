const { Product, ProductType } = require('../models');
const createError = require('http-errors');
const _ = require('lodash');

exports.create = async (req, res, next) => {
  const {
    body: {
      data: { name, typeName, attributes },
    },
  } = req;
  try {
    const productTypeInstance = await ProductType.findOne({
      where: { type_name: typeName },
    });
    const productInstance = await Product.create({ name });

    const result = await productTypeInstance.addProducts(productInstance, {
      through: { ...name, ...attributes, ...typeName },
    });

    result
      ? res.status(201).send({
          data: { result },
        })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

exports.bulkCreate = async (req, res, next) => {
  const {
    body: {
      data: { product: name },
    },
  } = req;
  try {
    const result = await Product.bulkCreate(name, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    result
      ? res.status(201).send({
          result,
        })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

exports.getById = async (req, res, next) => {};

exports.getMany = async (req, res, next) => {
  const { query } = req;
  try {
    const products = await Product.findAll({});

    _.isEmpty(products)
      ? res.status(404).send({ message: 'Product table is empty' })
      : res.status(200).send({ data: products });
  } catch (err) {
    return next(err);
  }
};

exports.updateById = async (req, res, next) => {
  d;
};

exports.deleteProductById = async (req, res, next) => {
  // const {
  //   params: { productId: id },
  // } = req;
  // try {
  //   (await Product.destroy({ where: { id } }))
  //     ? res.status(200).send({ message: `Product with id ${id} deleted` })
  //     : res.status(404).send({ message: `Product with id ${id} not found` });
  // } catch (err) {
  //   return next(err);
  // }
};

exports.bulkDeleteProduct = async ({}, res, next) => {
  // try {
  //   (await Product.destroy({ where: {} }))
  //     ? res.status(200).send({ message: 'All products removed' })
  //     : res.status(404).send({ message: 'Product table is empty' });
  // } catch (err) {
  //   return next(err);
  // }
};
