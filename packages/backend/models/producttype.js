'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    static associate({ Product, Attribute }) {
      ProductType.belongsToMany(Product, {
        through: {
          model: Attribute,
          unique: true,
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
