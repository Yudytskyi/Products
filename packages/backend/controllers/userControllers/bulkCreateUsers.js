const createError = require('http-errors');
const { User } = require('../../models');

const bulkCreateUsers = async (req, res, next) => {
  const {
    body: { data },
  } = req;
  try {
    const userTypeInstance = await User.bulkCreate(data);

    userTypeInstance.length
      ? res
          .status(201)
          .send({ message: `Created ${userTypeInstance.length} user(s).` })
      : next(createError(400));
  } catch (err) {
    return next(err);
  }
};

module.exports = bulkCreateUsers;
