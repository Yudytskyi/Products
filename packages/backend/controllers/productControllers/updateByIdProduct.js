const createError = require('http-errors');
const { sequelize, Product, ProductType, Attribute } = require('../../models');
const { ProductModel } = require('../../classes');
const { mergeProducts, getValueByKeys, cacheClear } = require('../../services');

const updateByIdProducts = async (req, res, next) => {
  const {
    body: {
      data: [updateData],
    },
    params: { productId },
  } = req;

  try {
    const productInstance = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });

    if (productInstance) {
      const transaction = await sequelize.transaction();
      if (updateData.product.name) {
        await Product.update(
          { name: updateData.product.name },
          { where: { id: productId }, transaction }
        );
      }

      const oldProductTypeId = getValueByKeys(productInstance, 'productTypeId');

      const product = new ProductModel(productInstance);

      const updateProduct = new ProductModel(updateData);
      updateProduct.set('productId', productId);

      const mergedProduct = mergeProducts(product, updateProduct);

      const newProduct = new ProductModel(mergedProduct);

      const newProductTypeInstance = await ProductType.findOne({
        where: { typeName: newProduct.typeName },
        transaction,
      });

      const attributes = newProduct.preparedProduct.attributes;
      if (oldProductTypeId) {
        await Attribute.destroy({
          where: {
            productId,
            productTypeId: oldProductTypeId,
          },
          transaction,
        });
      }

      const [attributeInstance] = await newProductTypeInstance.addProducts(
        productInstance,
        {
          through: attributes,
          transaction,
        }
      );

      productInstance && newProductTypeInstance && attributeInstance
        ? await transaction.commit()
        : (await transaction.rollback(), next(createError(400)));

      cacheClear(Product, productId);

      const updatedProductInstance = await Product.findByPk(productId, {
        include: [ProductType, Attribute],
      });

      const updatedProduct = new ProductModel(updatedProductInstance);

      res.status(200).send({
        message: `Product with id: ${productId} updated.`,
        data: updatedProduct.preparedProduct,
      });
    } else {
      res.status(404).send(`Product by id: ${productId} does not exist`);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = updateByIdProducts;
