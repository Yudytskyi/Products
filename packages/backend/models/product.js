'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductType, {
        as: {
          singular: 'type',
          plural: 'types',
        },
      });
    }
  }
  Product.init(
    {
      name: {
        type: Sequelize.STRING(256),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter product name',
          },
        },
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isPositive(weight) {
            if (weight <= 0) {
              throw new Error('The weight of the product must be positive');
            }
          },
        },
      },
      color: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter product color',
          },
        },
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isPositive(price) {
            if (price <= 0) {
              throw new Error('Please enter correct price');
            }
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
