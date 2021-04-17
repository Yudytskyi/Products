'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductType.init(
    {
      type_name: {
        type: DataTypes.ENUM({
          values: ['phone', 'tablet', 'laptop'],
        }),
        allowNull: false,
      },
      dualSim: {
        type: DataTypes.BOOLEAN,
        field: 'dual_sim',
        validate: {
          isPhone() {
            if (this.type_name !== 'phone') {
              throw new Error('This product has no dualSim attribute');
            }
          },
        },
      },
      videoCard: {
        type: DataTypes.STRING(256),
        field: 'video_card',
        validate: {
          isLaptop() {
            if (this.type_name !== 'laptop') {
              throw new Error('This product has no videoCard attribute');
            }
          },
        },
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
