const { Router } = require('express');
const { validateBody } = require('../middlewares');
const { loginSchema, signUpSchema } = require('../middlewares/schemas');
const { login, signUp, refresh } = require('../controllers');

const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), login);

authRouter.post('/signup', validateBody(signUpSchema), signUp);

authRouter.post('/refresh', refresh);

module.exports = authRouter;
