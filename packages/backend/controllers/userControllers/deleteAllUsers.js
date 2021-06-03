const { User } = require('../../models');

const deleteAllUsers = async (req, res, next) => {
  try {
    const numberOfDeleted = await User.cache().destroy({ where: {} });

    numberOfDeleted
      ? res.status(200).send(`${numberOfDeleted} user(s) have been deleted`)
      : res.status(404).send('Users table is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAllUsers;
