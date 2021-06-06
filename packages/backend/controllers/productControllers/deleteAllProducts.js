const { Product } = require('../../models');
const { cacheClear } = require('../../services');

const deleteAllProducts = async (req, res, next) => {
  try {
    const numberOfDeleted = await Product.destroy({ where: {} });

    if (numberOfDeleted) {
      cacheClear(Product);

      res.status(200).send(`${numberOfDeleted} product(s) have been deleted`);
    } else {
      res.status(404).send('Products table is empty');
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAllProducts;
