'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('attributes', {
      fields: ['product_id', 'product_type_id'],
      type: 'unique',
      name: 'foreign_pkey',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('attributes', 'foreign_pkey');
  },
};
