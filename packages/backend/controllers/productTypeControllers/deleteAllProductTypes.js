const { ProductType } = require('../../models');

const deleteAllProductTypes = async (req, res, next) => {
  try {
    const numberOfDeleted = await ProductType.cache().destroy({ where: {} });

    numberOfDeleted
      ? res
          .status(200)
          .send(`${numberOfDeleted} productType(s) have been deleted`)
      : res.status(404).send('ProductTypes table is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAllProductTypes;
