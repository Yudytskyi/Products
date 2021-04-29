const { sequelize, Product, ProductType, ProductInType } = require('../models');
const createError = require('http-errors');
const _ = require('lodash');

exports.create = async (req, res, next) => {
  const {
    body: {
      data: { name, typeName, attributes },
    },
  } = req;

  try {
    const transaction = await sequelize.transaction();

    const productType = await ProductType.findOne({
      where: { type_name: typeName },
      transaction,
    });

    const product = await Product.create({ name }, { transaction });

    const result = await productType.addProducts(product, {
      through: attributes,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      transaction,
    });

    if (result) {
      transaction.commit();
      res.status(201).send({ result });
    } else {
      transaction.rollback();
      next(createError(400));
    }
  } catch (err) {
    return next(err);
  }
};

exports.getById = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    const product = await Product.findByPk(productId, {
      attributes: ['id', 'name'],
      include: [
        {
          model: ProductType,
          as: 'product_types',
          attributes: ['type_name'],
          through: {
            attributes: ['weight', 'color', 'price', 'dualSim'],
          },
        },
      ],
    });

    const {
      dataValues: {
        id,
        name,
        product_types: [
          {
            dataValues: {
              type_name,
              ProductInType: { dataValues: attributes },
            },
          } = ProductInType,
        ] = [dataValues],
      },
    } = product;

    const prepareProduct = {
      id,
      name,
      type_name,
      ...attributes,
    };

    product
      ? res.status(200).send({ data: { ...prepareProduct } })
      : res.status(400).send(`Product by id:${productId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

exports.getMany = async (req, res, next) => {
  try {
    const allProduct = await Product.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'asc']],
      include: [
        {
          model: ProductType,
          as: 'product_types',
          attributes: ['type_name'],
          through: {
            attributes: ['weight', 'color', 'price', 'dualSim'],
          },
        },
      ],
    });

    allProduct.length
      ? res.status(200).send({ data: { allProduct } })
      : res.status(400).send('Table Product is empty');
  } catch (err) {
    return next(err);
  }
};

exports.updateById = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    res.status(200).send(`Product by id:${productId} updated`);
  } catch (err) {
    return next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    res.status(200).send(`Product by id:${productId} deleted`);
  } catch (err) {
    return next(err);
  }
};

exports.bulkDelete = async (req, res, next) => {
  const {} = req;
  try {
    res.status(200).send(`All product is deleted`);
  } catch (err) {
    return next(err);
  }
};
