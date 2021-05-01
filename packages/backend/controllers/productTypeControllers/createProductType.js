const { ProductType } = require('../../models');
const createError = require('http-errors');

const createProductType = async (req, res, next) => {
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

module.exports = createProductType;
