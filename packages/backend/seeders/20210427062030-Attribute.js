'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'attributes',
      [
        {
          product_id: 1,
          product_type_id: 1,
          weight: 1123,
          color: 'color123',
          price: 123.23,
          dualSim: false,
        },
        {
          product_id: 2,
          product_type_id: 1,
          weight: 1124,
          color: 'color312',
          price: 124.24,
          dualSim: false,
        },
        {
          product_id: 3,
          product_type_id: 2,
          weight: 1125,
          color: 'color315',
          price: 125.25,
          graphicsCard: 'cool graphicsCard125',
        },
        {
          product_id: 4,
          product_type_id: 3,
          weight: 1126,
          color: 'color316',
          price: 126.26,
        },
        {
          product_id: 5,
          product_type_id: 2,
          weight: 1127,
          color: 'color317',
          price: 127.27,
          graphicsCard: 'cool graphicsCard137',
        },
        {
          product_id: 6,
          product_type_id: 2,
          weight: 1128,
          color: 'color318',
          price: 128.28,
          graphicsCard: 'cool graphicsCard138',
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attributes', null, {});
  },
};
