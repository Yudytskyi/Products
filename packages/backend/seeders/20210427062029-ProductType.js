'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'products',
      [
        {
          data: {
            name: 'sku127',
            typeName: 'phone',
            attributes: {
              weight: 1123,
              color: 'color312',
              price: 123.23,
              dualSim: true,
            },
          },
        },
        {
          data: {
            name: 'sku128',
            typeName: 'phone',
            attributes: {
              weight: 1124,
              color: 'color312',
              price: 124.24,
              dualSim: false,
            },
          },
        },
        {
          data: {
            name: 'sku129',
            typeName: 'laptop',
            attributes: {
              weight: 1125,
              color: 'color315',
              price: 125.25,
              graphicsCard: 'cool graphicsCard125',
            },
          },
        },
        {
          data: {
            name: 'sku130',
            typeName: 'tablet',
            attributes: {
              weight: 1126,
              color: 'color316',
              price: 126.26,
            },
          },
        },
        {
          data: {
            name: 'sku127',
            typeName: 'laptop',
            attributes: {
              weight: 1127,
              color: 'color317',
              price: 127.27,
              graphicsCard: 'cool graphicsCard137',
            },
          },
        },
      ],
      {}
    );
  },
};
