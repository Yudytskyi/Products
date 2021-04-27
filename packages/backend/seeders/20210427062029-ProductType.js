'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'product_types',
      [
        { type_name: 'phone' },
        { type_name: 'tablet' },
        { type_name: 'laptop' },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_types', null, {});
  },
};
