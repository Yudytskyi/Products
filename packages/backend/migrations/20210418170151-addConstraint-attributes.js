'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('attributes', {
      fields: ['product_id', 'product_type_id'],
      type: 'unique',
      name: 'foreignPkey',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('attributes', 'foreignPkey');
  },
};
