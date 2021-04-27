const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize();

class Test extends Model {}
Test.init(
  {
    title: Sequelize.STRING,
  },
  { sequelize, modelName: 'test' }
);
class User extends Model {}
User.init(
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
  },
  { sequelize, modelName: 'user' }
);
class Address extends Model {}
Address.init(
  {
    type: DataTypes.STRING,
    line1: Sequelize.STRING,
    line2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
  },
  { sequelize, modelName: 'address' }
);

Test.User = Test.belongsTo(User);
User.Addresses = User.hasMany(Address);

Test.create(
  {
    title: 'Chair',
    user: {
      firstName: 'Mick',
      lastName: 'Broadstone',
      addresses: [
        {
          type: 'home',
          line1: '100 Main St.',
          city: 'Austin',
          state: 'TX',
          zip: '78704',
        },
      ],
    },
  },
  {
    include: [
      {
        association: Test.User,
        include: [User.Addresses],
      },
    ],
  }
);
