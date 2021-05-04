'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attributes', {
      productId: {
        type: Sequelize.INTEGER,
        field: 'product_id',
        references: {
          model: { tableName: 'products' },
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productTypeId: {
        type: Sequelize.INTEGER,
        field: 'product_type_id',
        references: {
          model: { tableName: 'product_types' },
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      dualSim: {
        type: Sequelize.BOOLEAN,
        field: 'dual_sim',
      },
      graphicsCard: {
        type: Sequelize.STRING(256),
        field: 'graphics_card',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attributes');
  },
};
