const { Router } = require('express');
const router = Router();
const { routes } = require('./routes');

module.exports = router.use(...routes);
