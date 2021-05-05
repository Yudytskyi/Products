const { Product, ProductType, Attribute } = require('../../models');
const { prepareProducts } = require('../../services');

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      order: [['id', 'asc']],
      include: [ProductType, Attribute],
    });

    if (allProducts.length) {
      res.status(200).send({ data: prepareProducts(allProducts) });
    } else {
      res.status(400).send('Table Products is empty');
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProducts;
