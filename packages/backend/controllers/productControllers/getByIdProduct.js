const { Product, ProductType, Attribute } = require('../../models');
const { prepareObjects, getValueByKeys } = require('../../services');
const { db } = require('../../config/db.json');
const prepareProductFields = getValueByKeys(db, 'prepareProductFields');

const getById = async (req, res, next) => {
  const {
    params: { productId },
  } = req;

  try {
    const foundProduct = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });

    foundProduct
      ? res
          .status(200)
          .send({ data: prepareObjects(foundProduct, prepareProductFields) })
      : res.status(404).send(`Product by id: ${productId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = getById;
