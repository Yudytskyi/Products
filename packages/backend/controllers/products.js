const { sequelize, Product, ProductType } = require('../models');
const createError = require('http-errors');
const _ = require('lodash');

const {
  db: {
    fields: { includesFields, excludesFields },
  },
} = require('../config/db.json');

const include = [
  {
    model: ProductType,
    as: 'product_types',
    attributes: ['id', 'type_name'],
    returning: true,
    through: {
      attributes: includesFields,
    },
  },
];

exports.create = async (req, res, next) => {
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

exports.getById = async (req, res, next) => {
  const {
    params: { productId },
  } = req;
  try {
    const productInstance = await Product.findByPk(productId, {
      attributes: ['id', 'name'],
      include,
    });

    if (productInstance) {
      const productData = productInstance.dataValues;
      const productTypeData = productData.product_types[0].dataValues;
      const attributesData = productTypeData.ProductInType.dataValues;

      const prepareProducts = {
        productId: productData.id,
        name: productData.name,
        typeName: productTypeData.type_name,
        ...attributesData,
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
    const allProducts = await Product.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'asc']],
      include: [
        {
          model: ProductType,
          as: 'product_types',
          attributes: ['type_name'],
          through: {
            attributes: includesFields,
          },
        },
      ],
    });

    if (allProducts.length) {
      const preparedAllProducts = [];

      allProducts.forEach(pr => {
        const product = pr.dataValues;
        const productType = product.product_types[0].dataValues;
        const productInType = productType.ProductInType.dataValues;

        preparedAllProducts.push({
          productId: product.id,
          namae: product.name,
          typeName: productType.type_name,
          ..._.pick(productInType, includesFields),
        });
      });

      res.status(200).send({ data: { preparedAllProducts } });
    } else {
      res.status(400).send('Table Product is empty');
    }
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
