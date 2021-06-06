const { Product, ProductType, Attribute } = require('../../models');
const { getMetaData } = require('../../services');
const { ProductModel } = require('../../classes');

const getAllProducts = async (req, res, next) => {
  const {
    query: { limit, offset },
  } = req;

  try {
    const allProducts = await Product.cache('getAllProducts').findAll({
      limit,
      offset,
      order: [['id', 'asc']],
      include: [ProductType, Attribute],
    });

    const countProducts = allProducts.length;

    if (countProducts) {
      const allPreparedProduct = allProducts.map(row => {
        const product = new ProductModel(row);
        return product.preparedProduct;
      });

      res.status(200).send({
        meta: getMetaData(countProducts, limit, offset),
        data: allPreparedProduct,
      });
    } else {
      res.status(400).send('Table Products is empty');
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProducts;
