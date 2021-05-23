const { Product, ProductType, Attribute } = require('../../models');
const { getMetaData } = require('../../services');
const { ProductModel } = require('../../classes');

const getAllProducts = async (req, res, next) => {
  const {
    query: { limit, offset },
  } = req;

  try {
    const { count, rows } = await Product.findAndCountAll({
      limit,
      offset,
      order: [['id', 'asc']],
      include: [ProductType, Attribute],
    });

    const allProducts = rows.map(row => {
      const product = new ProductModel(row);
      return product.preparedProduct;
    });

    count
      ? res.status(200).send({
          meta: getMetaData(count, limit, offset),
          data: allProducts,
        })
      : res.status(400).send('Table Products is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProducts;
