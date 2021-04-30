const { sequelize, Product, ProductType, ProductInType } = require('../models');
const createError = require('http-errors');
const removeEmptyObjects = require('../services/removeEmptyObjects');
const {} = require('../config/db.json')
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
    const allProducts = await Product.findByPk(productId, {
      attributes: ['id', 'name'],
      include: [
        {
          model: ProductType,
          as: 'product_types',
          attributes: ['id', 'type_name'],
          through: {
            attributes: ['weight', 'color', 'price', 'dualSim', 'graphicsCard'],
          },
        },
      ],
    });

    if (allProducts) {
      const productData = removeEmptyObjects(allProducts.dataValues);
      const productTypeData = removeEmptyObjects(
        productData.product_types[0].dataValues
      );
      const attributesData = removeEmptyObjects(
        productTypeData.ProductInType.dataValues
      );

      const prepareProducts = {
        product: { id: productData.id, name: productData.name },
        productType: {
          id: productTypeData.id,
          typeName: productTypeData.type_name,
        },
        attributes: attributesData,
      };
      res.status(200).send({ data: prepareProducts });
    } else {
      res.status(400).send(`Product by id:${productId} does not exist`);
    }
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

    allProducts.length
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
