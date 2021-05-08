const { sequelize, Product, ProductType, Attribute } = require('../../models');
const { prepareObjects } = require('../../services');
const { getValueByKeys } = require('../../services');
const {
  db: { modelPreparedProduct },
} = require('../../config/db.json');

const updateByIdProducts = async (req, res, next) => {
  const {
    body,
    params: { productId },
  } = req;

  try {
    const productInstance = await Product.findByPk(productId);
    if (!productInstance) {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }

    const transaction = sequelize.transaction();

    const [updatedProductCount] = await Product.update(
      { name: body.data.name },
      {
        where: { id: productId },
        returning: true,
      }
    );

    const productTypeInstance = await ProductType.findOne({
      where: { typeName: body.data.typeName },
    });
    const productTypeId = getValueByKeys(productTypeInstance, 'id');

    const [updatedAttributesCount] = await Attribute.update(
      body.data.attributes,
      {
        where: { productId, productTypeId },
        returning: true,
      }
    );

    if (updatedProductCount !== 1 || updatedAttributesCount !== 1) {
      res.status(404).send(`Product by id: ${productId} was not updated`);
    } else {
      // await updatedProductCount.save();
      // await attributesInstance.save();

      const updatedProduct = await Product.findByPk(productId, {
        include: [ProductType, Attribute],
      });

      res.status(200).send({
        data: prepareObjects(updatedProduct, modelPreparedProduct),
      });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = updateByIdProducts;
