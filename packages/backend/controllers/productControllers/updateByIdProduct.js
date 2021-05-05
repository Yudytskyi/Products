const { sequelize, Product, ProductType, Attribute } = require('../../models');
const { prepareProducts, getValueByKeys } = require('../../services');
const {
  db: {
    fields: { includesFields },
  },
} = require('../../config/db.json');

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
      res.status(200).send({ data: prepareProducts(updatedProduct) });
    } else {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = updateByIdProducts;
