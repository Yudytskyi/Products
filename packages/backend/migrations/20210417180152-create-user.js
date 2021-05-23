'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        field: 'firstName',
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'lastName',
        type: Sequelize.STRING,
        allowNull: false,
      },
      userName: {
        field: 'userName',
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        field: 'passwordHash',
        type: Sequelize.TEXT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};