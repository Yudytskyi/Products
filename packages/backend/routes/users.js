const { Router } = require('express');
const {
  createUser,
  getAllUsers,
  bulkCreateUsers,
  deleteAllUsers,
  getByIdUser,
  deleteByIdUser,
  getRandomUsers,
} = require('../controllers');
const { validateUserOnCreate } = require('../middlewares');

const userRouter = Router();

userRouter.route('/user').post(validateUserOnCreate, createUser);

userRouter.route('/user/:userId').get(getByIdUser).delete(deleteByIdUser);

userRouter.route('/users').get(getAllUsers).delete(deleteAllUsers);

userRouter
  .route('/users/:numberOfUsers')
  .post(getRandomUsers, validateUserOnCreate, bulkCreateUsers);

module.exports = userRouter;
