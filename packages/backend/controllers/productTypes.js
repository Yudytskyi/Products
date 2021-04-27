const { ProductType } = require('../models');
const createError = require('http-errors');

exports.create = async (req, res, next) => {
  const {} = req;
  try {
  } catch (err) {
    return next(err);
  }
};

exports.bulkCreate = async (req, res, next) => {
  const {
    body: {
      data: { productType },
    },
  } = req;
  try {
    const result = await ProductType.bulkCreate(productType, {
      exclude: ['createdAt', 'updatedAt'],
    });
    result ? res.status(201).send({ data: result }) : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

exports.getById = async (req, res, next) => {
  const {} = req;
  try {
  } catch (err) {
    return next(err);
  }
};

exports.getMany = async (req, res, next) => {
  const {} = req;
  try {
  } catch (err) {
    return next(err);
  }
};

exports.updateById = async (req, res, next) => {
  const {} = req;
  try {
  } catch (err) {
    return next(err);
  }
};

exports.deleteProductById = async (req, res, next) => {
  const {} = req;
  try {
  } catch (err) {
    return next(err);
  }
};

exports.bulkDeleteProduct = async ({}, res, next) => {
  const {} = req;
  try {
  } catch (err) {
    return next(err);
  }
};
