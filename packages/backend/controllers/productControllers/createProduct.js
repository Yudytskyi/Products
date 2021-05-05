const { sequelize, Product, ProductType, Attribute } = require('../../models');
const createError = require('http-errors');
const { prepareProduct, getValueByKeys } = require('../../services');

const createProduct = async (req, res, next) => {
  const {
    body: {
      data: { name, typeName, attributes },
    },
  } = req;

  try {
    const transaction = await sequelize.transaction();

    const productTypeInstance = await ProductType.findOne({
      where: { typeName },
      transaction,
    });

    const productInstance = await Product.create({ name }, { transaction });

    const [attributeInstance] = await productTypeInstance.addProducts(
      productInstance,
      {
        through: attributes,
        transaction,
      }
    );

    attributeInstance
      ? await transaction.commit()
      : (await transaction.rollback(), next(createError(400)));

    const { productId, productTypeId } = getValueByKeys(attributeInstance, [
      'productId',
      'productTypeId',
    ]);

    const newProduct = await Attribute.findOne({
      where: { productId, productTypeId },
      include: [Product, ProductType],
    });

    const preparedProduct = prepareProduct(
      productId,
      newProduct.Product.get('name'),
      newProduct.ProductType.get('typeName'),
      newProduct
    );

    res.status(201).send({ data: preparedProduct });
  } catch (err) {
    return next(err);
  }
};

module.exports = createProduct;
