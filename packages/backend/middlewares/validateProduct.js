const { productCreateSchema, productUpdateSchema } = require('./schemas');

module.exports.onCreate = async (req, res, next) => {
  const { body } = req;
  try {
    await productCreateSchema.validate(body);

    next();
  } catch (err) {
    res.status(400).send({ message: err.message ?? massage });
  }
};

module.exports.onUpdate = async (req, res, next) => {
  const { body } = req;
  try {
    await productUpdateSchema.validate(body);

    next();
  } catch (err) {
    res.status(400).send({ message: err.message ?? massage });
  }
};
