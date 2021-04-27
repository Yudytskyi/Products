'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('product_in_types', {
      fields: ['product_id', 'product_type_id'],
      type: 'unique',
      name: 'foreign_pkey',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('product_in_types', 'foreign_pkey');
  },
};
