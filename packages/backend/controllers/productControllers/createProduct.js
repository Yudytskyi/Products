const { sequelize, Product, ProductType } = require('../../models');
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
      where: { type_name: typeName },
      transaction,
    });

    const productInstance = await Product.create({ name }, { transaction });

    const productInTypeInstance = await productTypeInstance.addProducts(
      productInstance,
      {
        through: attributes,
        returning: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction,
      }
    );

    if (productInTypeInstance) {
      const preparedProducts = {
        productId: productInstance.dataValues.id,
        name: productInstance.dataValues.name,
        type_name: productTypeInstance.dataValues.type_name,
        ..._.pick(productInTypeInstance[0].dataValues, includesFields),
      };

      transaction.commit();
      res.status(201).send({ data: preparedProducts });
    } else {
      transaction.rollback();
      next(createError(400));
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = createProduct;
