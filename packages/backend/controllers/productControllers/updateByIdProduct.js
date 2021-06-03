const createError = require('http-errors');
const { sequelize, Product, ProductType, Attribute } = require('../../models');
const { ProductModel } = require('../../classes');
const { mergeProducts } = require('../../services');

const updateByIdProducts = async (req, res, next) => {
  const {
    body,
    params: { productId },
  } = req;

  const updateProduct = new ProductModel(body.data);
  updateProduct.set('productId', productId);

  try {
    const transaction = await sequelize.transaction();
    const [newProductTypeInstance] = await ProductType.findOrCreate({
      where: { typeName: updateProduct.typeName },
      transaction,
    });

    const oldProductInstance = await Product.cache().findByPk(productId, {
      include: [ProductType, Attribute],
      transaction,
    });
    const oldProduct = new ProductModel(oldProductInstance);
    const mergedProduct = mergeProducts(oldProduct, updateProduct);

    const newProduct = new ProductModel(mergedProduct);
    const [updatedProductCount, newProductInstance] =
      await Product.cache().update(
        { name: newProduct.name },
        {
          where: { id: newProduct.productId },
          returning: true,
          transaction,
        }
      );

    const oldAttributesInstance = await Attribute.cache().findOne({
      where: { productId, productTypeId: oldProduct.productTypeId },
      transaction,
    });

    await oldAttributesInstance.cache().destroy({ transaction });

    const attributeInstanceProduct = await newProductTypeInstance.addProducts(
      newProductInstance,
      {
        through: newProduct.preparedProduct.attributes,
        transaction,
      }
    );

    updatedProductCount === 1 &&
    newProductTypeInstance &&
    attributeInstanceProduct
      ? await transaction.commit()
      : (await transaction.rollback(), next(createError(400)));

    const updatedProductInstance = await Product.cache().findByPk(productId, {
      include: [ProductType, Attribute],
    });
    const updatedProduct = new ProductModel(updatedProductInstance);

    res.status(200).send({
      message: `Product with id: ${productId} updated.`,
      data: updatedProduct.preparedProduct,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = updateByIdProducts;
