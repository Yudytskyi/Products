'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'sku123',
        },
        {
          name: 'sku124',
        },
        {
          name: 'sku125',
        },
        {
          name: 'sku126',
        },
        {
          name: 'sku127',
        },
        {
          name: 'sku128',
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
