const { Product, ProductType, Attribute } = require('../../models');
const { ProductModel } = require('../../classes');

const getByIdProduct = async (req, res, next) => {
  const {
    params: { productId },
  } = req;

  try {
    const foundProduct = await Product.cache().findByPk(productId, {
      include: [ProductType, Attribute],
    });

    const product = new ProductModel(foundProduct);

    foundProduct
      ? res.status(200).send({
          data: product.preparedProduct,
        })
      : res.status(404).send(`Product by id: ${productId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = getByIdProduct;
