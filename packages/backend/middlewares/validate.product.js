const yup = require('yup');

const PRODUCT_CREATE_SCHEMA = yup
  .object()
  .shape({
    name: yup.string().trim().required(),
    weight: yup.number().positive().integer().required(),
    color: yup.string().trim().required(),
    price: yup.number().positive().required(),
    dualSim: yup.boolean(),
    graphicsCard: yup.string(),
  })
  .noUnknown({ unknownKey: true });

const PRODUCT_UPDATE_SCHEMA = yup
  .object()
  .shape({
    name: yup.string().trim(),
    weight: yup.number().positive().integer(),
    color: yup.string().trim(),
    price: yup.number().positive(),
    dualSim: yup.boolean(),
    graphicsCard: yup.string(),
  })
  .noUnknown({ unknownKey: true });

module.exports.validateOnCreate = async ({ body }, res, next) => {
  try {
    body = await PRODUCT_CREATE_SCHEMA.validate(body);
    next();
  } catch (err) {
    res.status(400).send({
      data: {
        message: err.message || massage,
      },
    });
  }
};

module.exports.validateOnUpdate = async ({ body }, res, next) => {
  try {
    body = await PRODUCT_UPDATE_SCHEMA.validate(body);
    next();
  } catch (err) {
    res.status(400).send({
      data: {
        message: err.message || massage,
      },
    });
  }
};
