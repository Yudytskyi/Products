const yup = require('yup');

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
      attributes: { graphicsCard, dualSim },
    },
  } = body;
  try {
    switch (typeName) {
      case 'phone':
        if (graphicsCard) {
          res
            .status(400)
            .send('The phone does not have a graphicsCard attribute');
        }
        break;
      case 'tablet':
        if (graphicsCard || dualSim) {
          res.status(400).send('The tablet has no additional attributes');
        }
        break;
      case 'laptop':
        if (dualSim) {
          res.status(400).send('The laptop does not have a dualSim attribute');
        }
        break;
      default:
        res.status(400).send('ProductType does not exist or is incorrect');
        break;
    }
    next();
  } catch (err) {
    res.status(400).send({
      data: {
        message: err.message ?? massage,
      },
    });
  }
};

module.exports.validateOnUpdate = async ({ body }, res, next) => {
  try {
    next();
  } catch (err) {}
};
