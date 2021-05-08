'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('attributes', {
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
            model: { tableName: 'productTypes' },
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
          field: 'dualSim',
        },
        graphicsCard: {
          type: Sequelize.STRING(256),
          field: 'graphicsCard',
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
      })
      .then(() =>
        queryInterface.addConstraint('attributes', {
          fields: ['product_id', 'product_type_id'],
          type: 'unique',
          name: 'foreignPkey',
        })
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attributes');
  },
};
