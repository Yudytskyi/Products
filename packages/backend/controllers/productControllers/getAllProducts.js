const { Product, ProductType } = require('../../models');
const _ = require('lodash');

const {
  db: {
    fields: { includesFields },
  },
} = require('../../config/db.json');

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

      allProducts.forEach(product => {
        const productData = product.dataValues;
        const productTypeData = product.product_types[0].dataValues;
        const productInTypeData = productTypeData.ProductInType.dataValues;

        preparedAllProducts.push({
          productId: productData.id,
          name: productData.name,
          typeName: productTypeData.type_name,
          ..._.pick(productInTypeData, includesFields),
        });
      });

      res.status(200).send({ data: preparedAllProducts });
    } else {
      res.status(400).send('Table Product is empty');
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProducts;