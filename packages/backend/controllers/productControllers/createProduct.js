const { sequelize, Product, ProductType, Attribute } = require('../../models');
const createError = require('http-errors');
const { prepareObjects } = require('../../services');
const {
  db: { modelPreparedProduct },
} = require('../../config/db.json');

const createProduct = async (req, res, next) => {
  const {
    body: {
      data: {
        product: { name },
        productType: { typeName },
        attributes,
      },
    },
  } = req;

  try {
    const transaction = await sequelize.transaction();

    const productInstance = await Product.create({ name }, { transaction });
    const productId = productInstance.dataValues.id;

    const [productTypeInstance] = await ProductType.findOrCreate({
      where: { typeName },
      transaction,
    });

    const [attributeInstance] = await productTypeInstance.addProducts(
      productInstance,
      {
        through: attributes,
        transaction,
      }
    );

    productInstance && productTypeInstance && attributeInstance
      ? await transaction.commit()
      : (await transaction.rollback(), next(createError(400)));

    const createdProduct = await Product.findByPk(productId, {
      include: [ProductType, Attribute],
    });

    const preparedProduct = prepareObjects(
      createdProduct,
      modelPreparedProduct
    );

    res.status(201).send({ data: preparedProduct });
  } catch (err) {
    return next(err);
  }
};

module.exports = createProduct;
