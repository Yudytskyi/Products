const { ProductType } = require('../../models');
const { getMetaData } = require('../../services');
const { ProductTypeModel } = require('../../classes');

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

    const allProductTypes = rows.map(row => {
      const productType = new ProductTypeModel(row);
      return productType.preparedProductType;
    });

    count
      ? res.status(200).send({
          meta: getMetaData(count, limit, offset),
          data: allProductTypes,
        })
      : res.status(400).send('Table ProductTypes is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllProductTypes;
