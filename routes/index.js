const router = require('express').Router();
// import all of the API routes from /api/index.js
const apiRoutes = require('./api');
// const htmlRoutes = require('./html/html-routes');

// add prefix of `/api` to all of the api routes imported form the `api` directory
router.use('/api', apiRoutes);

router.use((req, res) => {
  // res.status(404).send('404 Error!');
  return res.send('Wrong route!');
});

module.exports = router;