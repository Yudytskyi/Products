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
      user_id: {
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
        field: 'expired_in',
        type: DataTypes.DATE,
        allowNull: false,
      },
      userAgent: {
        field: 'user_agent',
        type: DataTypes.STRING,
      },
      fingerprint: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      underscored: true,
      tableName: 'refreshTokens',
    }
  );

  return RefreshToken;
};
