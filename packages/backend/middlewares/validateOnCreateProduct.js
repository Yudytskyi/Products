const createError = require('http');
const _ = require('lodash');

const { productCreateSchema } = require('./schemas');
const {
  db: {
    productTypes: { typeName: productTypeNames },
  },
} = require('../config/db.json');

const validateOnCreateProduct = async (req, res, next) => {
  const {
    body,
    body: {
      data: { typeName, attributes },
      /* the attributes are used by the eval function */
    },
  } = req;
  try {
    await productCreateSchema[typeName].validate(body);

    const { check } = productTypeNames[typeName];
    if (eval(check)) {
      res.status(400).send(`Entered incorrect attribute "${typeName}"`);
      next(createError(400));
    }

    next();
  } catch (err) {
    res.status(400).send({
      message: err.message ?? massage,
    });
  }
};

module.exports = validateOnCreateProduct;
