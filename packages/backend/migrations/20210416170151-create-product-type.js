'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'product_types',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        productId: {
          type: Sequelize.INTEGER,
          field: 'product_id',
          references: {
            model: 'products',
          },
          onDelete: 'CASCADE',
        },
        type_name: {
          type: Sequelize.ENUM({
            values: ['phone', 'tablet', 'laptop'],
          }),
          allowNull: false,
        },
        dualSim: {
          type: Sequelize.BOOLEAN,
          field: 'dual_sim',
        },
        videoCard: {
          type: Sequelize.STRING(256),
          field: 'video_card',
          validate: {
            notEmpty: true,
          },
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
      },
      { Sequelize }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_types');
  },
};
