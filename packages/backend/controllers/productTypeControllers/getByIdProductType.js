const { ProductType } = require('../../models');
const createError = require('http-errors');

const getByIdProductType = async (req, res, next) => {
  const {
    params: { productTypeId },
  } = req;
  try {
    res.status(200).send(`productType whit id:${productTypeId}`);
  } catch (err) {
    return next(err);
  }
};

module.exports = getByIdProductType;
