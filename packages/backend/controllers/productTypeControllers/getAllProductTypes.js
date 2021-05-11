const { ProductType } = require('../../models');
const { prepareObjects, getMetaData } = require('../../services');
const {
  db: { modelPreparedProductType },
} = require('../../config/db.json');

const getAllProductTypes = async (req, res, next) => {
  const {
    query: { limit, offset },
  } = req;

  try {
    const { count, rows } = await ProductType.findAndCountAll({
      limit,
      offset,
      order: [['id', 'asc']],
    });

    count
      ? res.status(200).send({
          meta: getMetaData(count, limit, offset),
          data: prepareObjects(rows, modelPreparedProductType),
        })
      : res.status(400).send('Table ProductTypes is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProductTypes;
