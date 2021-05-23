const { User } = require('../../models');
const { getMetaData } = require('../../services');
const { UserModel } = require('../../classes');

const getAllUsers = async (req, res, next) => {
  const {
    query: { limit, offset },
  } = req;

  try {
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      order: [['id', 'asc']],
    });

    const allUsers = rows.map(row => {
      const user = new UserModel(row);
      return user.preparedUser;
    });

    count
      ? res.status(200).send({
          meta: getMetaData(count, limit, offset),
          data: allUsers,
        })
      : res.status(400).send('Table Users is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllUsers;
