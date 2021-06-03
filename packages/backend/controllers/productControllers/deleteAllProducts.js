const { Product } = require('../../models');

const deleteAllProducts = async (req, res, next) => {
  try {
    const numberOfDeleted = await Product.cache().destroy({ where: {} });

    numberOfDeleted
      ? res.status(200).send(`${numberOfDeleted} product(s) have been deleted`)
      : res.status(404).send('Products table is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAllProducts;
