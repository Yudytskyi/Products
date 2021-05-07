const { sequelize, Product, ProductType, Attribute } = require('../../models');
const createError = require('http-errors');
const { prepareProducts } = require('../../services');

const createProduct = async (req, res, next) => {
  const {
    body: {
      data: { name, typeName, attributes },
    },
  } = req;

  try {
    const transaction = await sequelize.transaction();

    const [productTypeInstance] = await ProductType.findOrCreate({
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

    const { productId, productTypeId } = attributeInstance.dataValues;

    const createdProduct = await Attribute.findOne({
      where: { productId, productTypeId },
      include: [Product, ProductType],
    });

    const preparedProduct = prepareProducts(createdProduct);

    res.status(201).send({ data: preparedProduct });
  } catch (err) {
    return next(err);
  }
};

module.exports = createProduct;
