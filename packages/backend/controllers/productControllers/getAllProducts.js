const { sequelize, Product, ProductType } = require('../../models');
const createError = require('http-errors');
const _ = require('lodash');

const {
  db: {
    fields: { includesFields, excludesFields },
  },
} = require('../../config/db.json');

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

const getAllProducts = async (req, res, next) => {
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

module.exports = getAllProducts;
