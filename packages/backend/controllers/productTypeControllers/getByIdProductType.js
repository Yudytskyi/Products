const { ProductType } = require('../../models');
const { prepareObjects } = require('../../services');
const {
  db: { modelPreparedProductType },
} = require('../../config/db.json');

const getByIdProductType = async (req, res, next) => {
  const {
    params: { productTypeId },
  } = req;
  try {
    const foundProductType = await ProductType.findByPk(productTypeId);

    foundProductType
      ? res.status(200).send({
          data: prepareObjects(foundProductType, modelPreparedProductType),
        })
      : res
          .status(404)
          .send(`ProductType by id: ${productTypeId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = getByIdProductType;
