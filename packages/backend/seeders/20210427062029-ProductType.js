'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'productTypes',
      [{ typeName: 'phone' }, { typeName: 'tablet' }, { typeName: 'laptop' }],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productTypes', null, {});
  },
};
