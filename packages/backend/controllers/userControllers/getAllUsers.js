const { User } = require('../../models');
const { prepareObjects, getMetaData } = require('../../services');
const {
  db: { modelPreparedUser },
} = require('../../config/db.json');

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

    count
      ? res.status(200).send({
          meta: getMetaData(count, limit, offset),
          data: prepareObjects(rows, modelPreparedUser),
        })
      : res.status(400).send('Table Users is empty');
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllUsers;
