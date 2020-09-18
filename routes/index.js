const router = require('express').Router();
const userController = require('../../controllers/user-controller');
const thoughtController = require('../../controllers/thought-controller');

const userRoutes = require('./api/user-routes');
const thoughtRoutes = require('./api/thought-routes');

// add prefix of `/user` to routes created in `user-routes.js1
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes)

module.exports = router;