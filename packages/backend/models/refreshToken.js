'use strict';
const { Model } = require('sequelize');
const isAfter = require('date-fns/isAfter');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate({ User }) {
      RefreshToken.belongsTo(User, { foreignKey: 'user_id' });
    }

    isUnexpired() {
      return isAfter(new Date(this.get('expiredIn')), new Date());
    }
  }
  RefreshToken.init(
    {
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      expiredIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userAgent: DataTypes.STRING,
      fingerprint: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      underscored: true,
      tableName: 'refreshToken',
    }
  );

  return RefreshToken;
};
