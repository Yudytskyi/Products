const { ProductType } = require('../../models');

const deleteByIdProductType = async (req, res, next) => {
  const {
    params: { productTypeId },
  } = req;

  try {
    const productTypeInstance = await ProductType.findByPk(productTypeId);

    productTypeInstance
      ? (await productTypeInstance.destroy()) &&
        res.status(200).send(`ProductType by id:${productTypeId} deleted`)
      : res
          .status(404)
          .send(`ProductType by id: ${productTypeId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteByIdProductType;
