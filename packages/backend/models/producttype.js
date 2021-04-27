'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    static associate(models) {
      ProductType.belongsToMany(models.Product, {
        through: {
          model: models.ProductInType,
          unique: true,
        },
        as: {
          singular: 'product',
          plural: 'products',
        },
      });
    }
  }
  ProductType.init(
    {
      type_name: {
        allowNull: false,
        type: DataTypes.ENUM({
          values: ['phone', 'tablet', 'laptop'],
        }),
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'ProductType',
      underscored: true,
      tableName: 'product_types',
    }
  );
  return ProductType;
};
