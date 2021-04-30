const createError = require('http');

const { productCreateSchemas } = require('./schemas');
const {
  db: {
    productTypes: { typeName: productTypeNames },
  },
} = require('../config/db.json');

module.exports.validateOnCreate = async (req, res, next) => {
  const {
    body,
    body: {
      data: { typeName, attributes },
      /* the attributes are used by the eval function */
    },
  } = req;
  try {
    await productCreateSchemas[typeName].validate(body);

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

module.exports.validateOnUpdate = async ({ body }, res, next) => {
  try {
    next();
  } catch (err) {}
};
