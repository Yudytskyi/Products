const { Product, ProductType, Attribute } = require('../../models');
const { prepareObjects, getMetaData } = require('../../services');
const {
  db: { modelPreparedProduct },
} = require('../../config/db.json');

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
