'use strict';
const { hashSync, compare } = require('bcrypt');
const { Model } = require('sequelize');
const { SALT_ROUNDS } = require('../config/jwt');
const {
  db: {
    modelPreparedUser: {
      user: { role: roles },
    },
  },
} = require('../config/db.json');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ RefreshToken }) {
      User.hasMany(RefreshToken, { foreignKey: 'user_id' });
    }
    comparePassword(value) {
      return compare(value, this.getDataValue('password'));
    }
  }
  User.init(
    {
      firstName: {
        field: 'firstName',
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'lastName',
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        field: 'userName',
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        field: 'passwordHash',
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          this.setDataValue('password', hashSync(value, SALT_ROUNDS));
        },
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkRoleValue(value) {
            if (roles.includes(value)) {
              return;
            }
            throw new Error(`Role "${value}" is not valid value!`);
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      tableName: 'users',
    }
  );
  return User;
};
