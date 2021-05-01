const { ProductType } = require('../../models');
const createError = require('http-errors');

const deleteAllProductTypes = async (req, res, next) => {
  const {} = req;
  try {
    res.status(200).send('All productTypes is removed...');
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAllProductTypes;
