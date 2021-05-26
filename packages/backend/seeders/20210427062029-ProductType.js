'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'productTypes',
      [
        {
          typeName: 'phone',
        },
        {
          typeName: 'laptop',
        },
        {
          typeName: 'tablet',
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productTypes', null, {});
  },
};
