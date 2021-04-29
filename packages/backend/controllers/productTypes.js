const { ProductType } = require('../models');
const createError = require('http-errors');

exports.create = async (req, res, next) => {
  const {
    body: {
      data: { typeName },
    },
  } = req;
  try {
    res.status(201).send(`created ProductType with name "${typeName}"`);
  } catch (err) {
    return next(err);
  }
};

exports.getById = async (req, res, next) => {
  const {
    params: { productTypeId },
  } = req;
  try {
    res.status(200).send(`productType whit id:${productTypeId}`);
  } catch (err) {
    return next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  const {
    params: { productTypeId },
  } = req;
  try {
    res.status(200).send(`deleted productType whit id:${productTypeId}`);
  } catch (err) {
    return next(err);
  }
};

exports.getMany = async (req, res, next) => {
  const {} = req;
  try {
    res.status(200).send('All productTypes...');
  } catch (err) {
    return next(err);
  }
};

exports.bulkDelete = async (req, res, next) => {
  const {} = req;
  try {
    res.status(200).send('All productTypes is removed...');
  } catch (err) {
    return next(err);
  }
};
