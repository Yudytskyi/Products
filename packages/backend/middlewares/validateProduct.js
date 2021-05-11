const { productCreateSchema, productUpdateSchema } = require('./schemas');

const validateProduct = {
  async onCreate(req, res, next) {
    const { body } = req;
    try {
      await productCreateSchema.validate(body);

      next();
    } catch (err) {
      res.status(400).send({ message: err.message ?? massage });
    }
  },

  async onUpdate(req, res, next) {
    const { body } = req;
    try {
      await productUpdateSchema.validate(body);

      next();
    } catch (err) {
      res.status(400).send({ message: err.message ?? massage });
    }
  },
};

module.exports = validateProduct;
