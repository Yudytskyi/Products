const { Product, ProductType, Attribute } = require('../../models');
const { prepareObjects } = require('../../services');
const {
  db: { modelPreparedProduct },
} = require('../../config/db.json');

function getMetaData(count, limit, offset = 0) {
  const meta = {};
  const countAllProducts = Number(count);
  const countProductsOnPage = Number(limit);
  const numberFirstProductOnPage = Number(offset) + 1;

  meta.countAllProducts = countAllProducts;

  if (limit) {
    const currentPage = Math.ceil(
      numberFirstProductOnPage / countProductsOnPage
    );
    const totalPages = Math.ceil(countAllProducts / countProductsOnPage);
    meta.countProductsOnPage =
      countAllProducts - numberFirstProductOnPage + 1 > countProductsOnPage
        ? countProductsOnPage
        : countAllProducts - numberFirstProductOnPage + 1;
    meta.page = String(`${currentPage} of ${totalPages}`);
    meta.numberFirstProductOnPage = numberFirstProductOnPage;
  }
  return meta;
}

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

    count
      ? res.status(200).send({
          meta: getMetaData(count, limit, offset),
          data: prepareObjects(rows, modelPreparedProduct),
        })
      : res.status(400).send('Table Products is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProducts;
