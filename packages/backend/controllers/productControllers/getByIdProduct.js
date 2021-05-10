const { Product, ProductType, Attribute } = require('../../models');
const { prepareObjects } = require('../../services');
const {
  db: { modelPreparedProduct },
} = require('../../config/db.json');

const getByIdProduct = async (req, res, next) => {
  const {
    params: { productId },
  } = req;

  try {
    const foundProduct = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });

    foundProduct
      ? res.status(200).send({
          data: prepareObjects(foundProduct, modelPreparedProduct),
        })
      : res.status(404).send(`Product by id: ${productId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = getByIdProduct;
