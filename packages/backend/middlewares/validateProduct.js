const _ = require('lodash'); //used by the eval function
const createError = require('http');

const { productCreateSchema, productUpdateSchema } = require('./schemas');
const {
  db: {
    productTypes: { typeName: productTypeNames },
  },
} = require('../config/db.json');

const validate = async (req, res, next, validationSchema) => {
  const {
    body,
    body: {
      data: { typeName, attributes },
      /* the attributes are used by the eval function */
    },
  } = req;
  try {
    await validationSchema.validate(body);

    // const { check } = productTypeNames[typeName];
    // if (eval(check)) {
    //   res.status(400).send(`Entered incorrect attribute "${typeName}"`);
    //   next(createError(400));
    // }

    next();
  } catch (err) {
    res.status(400).send({
      message: err.message ?? massage,
    });
  }
};

const validateProduct = {
  onCreate(req, res, next) {
    validate(req, res, next, productCreateSchema);
  },
  onUpdate(req, res, next) {
    validate(req, res, next, productUpdateSchema);
  },
};

module.exports = validateProduct;
