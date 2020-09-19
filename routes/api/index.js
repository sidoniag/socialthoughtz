const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// add prefix of `/user` to routes created in `user-routes.js1
router.use('/thought', thoughtRoutes)
router.use('/user', userRoutes);

module.exports = router;