const { Product } = require('../../models');

const deleteAllProduct = async (req, res, next) => {
  try {
    const number = await Product.destroy({ where: {} });

    number
      ? res.status(200).send(`${number} product(s) have been deleted`)
      : res.status(404).send('Products table is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAllProduct;
