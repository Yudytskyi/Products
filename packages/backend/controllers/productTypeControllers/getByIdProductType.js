const { ProductType } = require('../../models');
const { ProductTypeModel } = require('../../classes');

const getByIdProductType = async (req, res, next) => {
  const {
    params: { productTypeId },
  } = req;
  try {
    const foundProductType = await ProductType.findByPk(productTypeId);
    const productType = new ProductTypeModel(foundProductType);

    foundProductType
      ? res.status(200).send({
          data: productType.preparedProductType,
        })
      : res
          .status(404)
          .send(`ProductType by id: ${productTypeId} does not exist`);
  } catch (err) {
    return next(err);
  }
};

module.exports = getByIdProductType;
