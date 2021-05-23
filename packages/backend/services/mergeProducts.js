const mergeProducts = (oldProduct, updateProduct) => {
  const newProduct = oldProduct;
  Object.keys(newProduct).forEach(key => {
    if (updateProduct[key] !== undefined) {
      newProduct.set(key, updateProduct[key]);
    }
  });
  return newProduct;
};

module.exports = mergeProducts;
