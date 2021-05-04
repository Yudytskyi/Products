const { sequelize, Product, ProductType, Attribute } = require('../../models');
const createError = require('http-errors');
const _ = require('lodash');

const {
  db: {
    fields: { includesFields },
  },
} = require('../../config/db.json');

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

    const {
      dataValues: { productId, productTypeId },
    } = attributeInstance;

    const { dataValues: newProduct } = await Attribute.findOne({
      where: { productId, productTypeId },
      attributes: includesFields,
      include: [Product, ProductType],
    });

    const preparedProduct = {
      productId,
      name: newProduct.Product.get('name'),
      typeName: newProduct.ProductType.get('typeName'),
      ..._.pick(newProduct, includesFields),
    };

    res.status(201).send({ data: preparedProduct });
  } catch (err) {
    return next(err);
  }
};

module.exports = createProduct;
