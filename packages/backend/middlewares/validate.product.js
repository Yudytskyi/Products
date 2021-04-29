const yup = require('yup');
const _ = require('lodash');
const createError = require('http');
const {
  db: {
    productTypes: { productTypeNames },
  },
} = require('../config/db.json');

const PRODUCT_CREATE_SCHEMA = yup
  .object()
  .shape({
    data: yup.object().shape({
      name: yup.string(),
      typeName: yup.string().trim(),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
        dualSim: yup.boolean(),
        graphicsCard: yup.string(),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

module.exports.validateOnCreate = async (req, res, next) => {
  const { body } = req;
  await PRODUCT_CREATE_SCHEMA.validate(body);
  const {
    data: {
      typeName,
      attributes,
      /* the attributes are used by the eval function */
    },
  } = body;
  try {
    for (const name in productTypeNames) {
      if (name === typeName) {
        const { check } = productTypeNames[name];
        if (eval(check)) {
          res.status(400).send('Entered incorrect attributes');
          next(createError(400));
        }
      }
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
