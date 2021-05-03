const { Product } = require('../../models');

const deleteByIdProducts = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    const productInstance = await Product.findByPk(productId);

    productInstance
      ? (await productInstance.destroy()) &&
        res.status(200).send(`Product by id:${productId} deleted`)
      : res.status(404).send(`Product by id: ${productId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteByIdProducts;
