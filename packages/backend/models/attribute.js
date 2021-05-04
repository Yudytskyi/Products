'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    static associate({ Product, ProductType }) {
      Attribute.belongsTo(Product, { foreignKey: 'product_id' });
      Attribute.belongsTo(ProductType, { foreignKey: 'product_type_id' });
    }
  }
  Attribute.init(
    {
      productId: {
        field: 'product_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
      productTypeId: {
        field: 'product_type_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'ProductType',
          key: 'id',
        },
      },
      weight: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter product color',
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isPositive(price) {
            if (price <= 0) {
              throw new Error('Please enter correct price');
            }
          },
        },
      },
      dualSim: {
        type: DataTypes.BOOLEAN,
        field: 'dualSim',
      },
      graphicsCard: {
        type: DataTypes.STRING(256),
        field: 'graphicsCard',
      },
    },
    {
      sequelize,
      modelName: 'Attribute',
      underscored: true,
      tableName: 'attributes',
    }
  );
  return Attribute;
};
