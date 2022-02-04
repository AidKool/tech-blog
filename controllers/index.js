const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.all('*', async (_, res) => {
  res.redirect('/');
});

// router.get('/', async (req, res) => {
//   res.status(200).send('<h1>Connection Established</h1>');
// });

module.exports = router;
