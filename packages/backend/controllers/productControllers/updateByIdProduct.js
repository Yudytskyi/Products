const createError = require('http-errors');
const { sequelize, Product, ProductType, Attribute } = require('../../models');
const {
  prepareObjects,
  getValueByKeys,
  mergeObjects,
  getAllFieldsOfObject,
} = require('../../services');
const {
  db: { modelPreparedProduct },
} = require('../../config/db.json');

const updateByIdProducts = async (req, res, next) => {
  const {
    body,
    params: { productId },
  } = req;
  const updateDataObject = body.data;
  updateDataObject.product.productId = productId;

  try {
    const transaction = await sequelize.transaction();

    if (true) {
    }
    const [newProductTypeInstance] = await ProductType.findOrCreate({
      where: { typeName: updateDataObject.productType.typeName },
      transaction,
    });

    const oldProductInstance = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
      transaction,
    });

    const oldProduct = prepareObjects(oldProductInstance, modelPreparedProduct);

    const oldProductTypeId = oldProduct.productType.productTypeId;

    const newProduct = mergeObjects(oldProduct, updateDataObject);

    const [updatedProductCount, productInstance] = await Product.update(
      { name: newProduct.product.name },
      {
        where: { id: newProduct.product.productId },
        returning: true,
        transaction,
      }
    );

    const attributes = newProduct.attributes;

    const oldAttributesInstance = await Attribute.findOne({
      where: { productId, productTypeId: oldProductTypeId },
      transaction,
    });

    await oldAttributesInstance.destroy({ transaction });

    const attributeInstance = await newProductTypeInstance.addProducts(
      productInstance,
      {
        through: attributes,
        transaction,
      }
    );

    updatedProductCount === 1 && newProductTypeInstance && attributeInstance
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
