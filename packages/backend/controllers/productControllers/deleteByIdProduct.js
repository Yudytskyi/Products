const { Product } = require('../../models');
const { cacheClear } = require('../../services');

const deleteByIdProducts = async (req, res, next) => {
  const {
    params: { productId },
  } = req;

  try {
    const productInstance = await Product.cache(`Product:${productId}`).findOne(
      {
        where: { id: productId },
      }
    );

    if (productInstance) {
      await productInstance.destroy();

      cacheClear(Product, productId);

      res.status(200).send(`Product by id:${productId} deleted`);
    } else {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteByIdProducts;
