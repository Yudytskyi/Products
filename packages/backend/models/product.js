'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.ProductType, {
        through: {
          model: models.ProductInType,
          unique: true,
        },
        as: {
          singular: 'product_type',
          plural: 'product_types',
        },
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter product name',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
      underscored: true,
      tableName: 'products',
    }
  );
  return Product;
};
