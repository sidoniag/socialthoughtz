const router = require('express').Router();
// const pizzaController = require('../../controllers/pizza-controller');
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thoughts-routes');

// add prefix of `/user` to routes created in `user-routes.js1
router.use('/user', userRoutes);

module.exports = router;