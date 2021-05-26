'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'Ivanov',
          lastName: 'Ivan',
          userName: 'Vanya',
          // password: 'firstUser1',
          passwordHash:
            '$2b$05$2byv1OvVi0v2RklPB/eXqeXPD/AQpaNEWy6WicWuw05F9EtRjxNJu',
          email: 'ivanov@gmail.com',
          role: 'admin',
        },
        {
          firstName: 'Petrov',
          lastName: 'Peter',
          userName: 'Petya',
          // password: 'secondUser2',
          passwordHash:
            '$2b$05$HRAk9D80A/Zn6vohzENjGuR2c9R/B98UFJIZ/aWlH1nuexdh85KWK',
          email: 'petrov@gmail.com',
          role: 'user',
        },
        {
          firstName: 'Sidorov',
          lastName: 'Sidor',
          userName: 'Sid',
          // password: 'thirdUser3',
          passwordHash:
            '$2b$05$p2YXYxtHwcOUo6ilWlclV.nI1p2SqSijv9xuGC98hre0T7es4SJgi',
          email: 'sidorov@gmail.com',
          role: 'guest',
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
