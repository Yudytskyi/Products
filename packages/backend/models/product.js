'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ ProductType, Attribute }) {
      Product.belongsToMany(ProductType, {
        through: {
          model: Attribute,
          unique: true,
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
