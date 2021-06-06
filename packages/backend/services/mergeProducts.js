const {
  db: { productFields },
} = require('../config/db.json');

const mergeProducts = (oldProduct, updateProduct) => {
  const newProduct = oldProduct;
  productFields.forEach(key => {
    if (updateProduct[key] !== undefined) {
      newProduct.set(key, updateProduct[key]);
    }
  });
  return newProduct;
};

module.exports = mergeProducts;
