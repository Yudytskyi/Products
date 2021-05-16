const { Router } = require('express');
const {
  createUser,
  getAllUsers,
  bulkCreateUsers,
  deleteAllUsers,
  getByIdUser,
  deleteByIdUser,
} = require('../controllers');
// const { validateUser } = require('../middlewares');
const userRouter = Router();

userRouter.route('/user').post(createUser);

userRouter.route('/user/:userId').get(getByIdUser).delete(deleteByIdUser);

userRouter.route('/users').get(getAllUsers).delete(deleteAllUsers);

userRouter.route('/users/:numberOfUsers').post(bulkCreateUsers);

module.exports = userRouter;
