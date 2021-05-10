const { sequelize, Product, ProductType, Attribute } = require('../../models');
const { prepareObjects, getValueByKeys } = require('../../services');
const {
  db: { modelPreparedProduct },
} = require('../../config/db.json');

const updateByIdProducts = async (req, res, next) => {
  const {
    body,
    params: { productId },
  } = req;

  try {
    const foundProduct = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });
    if (!foundProduct) {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }

    const productTypeId = getValueByKeys(foundProduct, 'productTypeId');

    const transaction = await sequelize.transaction();

    const [updatedProductCount] = await Product.update(
      { name: body.data.name },
      {
        where: { id: productId },
        returning: true,
        transaction,
      }
    );

    const [updatedProductTypeCount] = await ProductType.update(
      { typeName: body.data.typeName },
      {
        where: { id: productTypeId },
        returning: true,
        transaction,
      }
    );

    const [updatedAttributesCount] = await Attribute.update(
      body.data.attributes,
      {
        where: { productId, productTypeId },
        returning: true,
        transaction,
      }
    );

    updatedProductCount === 1 &&
    updatedProductTypeCount === 1 &&
    updatedAttributesCount === 1
      ? await transaction.commit()
      : (await transaction.rollback(), next(createError(400)));

    const updatedProduct = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });

    res.status(200).send({
      message: `Product with id: ${productId} updated.`,
      data: prepareObjects(updatedProduct, modelPreparedProduct),
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = updateByIdProducts;
