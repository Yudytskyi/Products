//      Product
module.exports.createProduct = require('./productControllers/createProduct');
module.exports.getByIdProduct = require('./productControllers/getByIdProduct');
module.exports.getAllProducts = require('./productControllers/getAllProducts');
module.exports.updateByIdProduct = require('./productControllers/updateByIdProduct');
module.exports.deleteByIdProduct = require('./productControllers/deleteByIdProduct');
module.exports.deleteAllProducts = require('./productControllers/deleteAllProducts');

//      ProductType
module.exports.createProductType = require('./productTypeControllers/createProductType');
module.exports.deleteByIdProductType = require('./productTypeControllers/deleteByIdProductType');
module.exports.getByIdProductType = require('./productTypeControllers/getByIdProductType');
module.exports.getAllProductTypes = require('./productTypeControllers/getAllProductTypes');
module.exports.deleteAllProductTypes = require('./productTypeControllers/deleteAllProductTypes');
