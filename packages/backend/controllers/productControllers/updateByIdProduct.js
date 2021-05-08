const { sequelize, Product, ProductType, Attribute } = require('../../models');
const { prepareObjects, getValueByKeys } = require('../../services');
const { db } = require('../../config/db.json');
const prepareProductFields = getValueByKeys(db, 'prepareProductFields');

const updateByIdProducts = async (req, res, next) => {
  const {
    body: {
      data: { name, typeName, attributes },
    },
    params: { productId },
  } = req;

  try {
    const productInstance = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });

    if (productInstance) {
      const { productTypeId } = getValueByKeys(
        productInstance,
        'productTypeId'
      );

      productInstance.dataValues.name = name;

      attributesInstance = await Attribute.findOne({
        where: {
          productId,
          productTypeId,
        },
      });
      attributesInstance.dataValues = attributes;

      await productInstance.save();
      await attributesInstance.save();

      const updatedProduct = await Product.findByPk(productId, {
        include: [ProductType, Attribute],
      });
      res
        .status(200)
        .send({ data: prepareObjects(updatedProduct, prepareProductFields) });
    } else {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = updateByIdProducts;
