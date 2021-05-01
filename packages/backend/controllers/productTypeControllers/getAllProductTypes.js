const { ProductType } = require('../../models');
const createError = require('http-errors');

const getAllProductTypes = async (req, res, next) => {
  const {} = req;
  try {
    res.status(200).send('All productTypes...');
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProductTypes;
