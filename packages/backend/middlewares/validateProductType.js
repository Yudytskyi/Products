const { productTypeCreateSchema } = require('./schemas');

module.exports.onCreate = async (req, res, next) => {
  const { body } = req;
  try {
    await productTypeCreateSchema.validate(body);

    next();
  } catch (err) {
    res.status(400).send({ message: err.message ?? massage });
  }
};
