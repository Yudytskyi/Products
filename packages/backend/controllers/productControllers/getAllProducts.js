const { Product, ProductType, Attribute } = require('../../models');
const { prepareProducts } = require('../../services');

const getAllProducts = async (req, res, next) => {
  const {
    query: { limit, offset },
  } = req;

  try {
    const {
      count: countAllProducts,
      rows: productsPerPage,
    } = await Product.findAndCountAll({
      limit,
      offset,
      order: [['id', 'asc']],
      include: [ProductType, Attribute],
    });
    const countProductsOnPage = Number(limit);
    const numberFirstProductOnPage = Number(offset);
    const currentPage =
      Math.floor(numberFirstProductOnPage / countProductsOnPage) + 1;

    if (productsPerPage.length) {
      res.status(200).send({
        meta: {
          countAllProducts,
          countProductsOnPage,
          currentPage,
          numberFirstProductOnPage,
        },
        data: prepareProducts(productsPerPage),
      });
    } else {
      res.status(400).send('Table Products is empty');
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProducts;
