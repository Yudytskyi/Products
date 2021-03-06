'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refreshTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        references: {
          model: { tableName: 'users' },
        },
      },
      token: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
      },
      expiredIn: {
        type: Sequelize.DATE,
        field: 'expired_in',
        allowNull: false,
      },
      userAgent: {
        type: Sequelize.STRING,
        field: 'user_agent',
      },
      fingerprint: {
        type: Sequelize.STRING,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('refreshTokens');
  },
};
