const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  res.status(200).send('<h1>Connection Established</h1>');
});

module.exports = router;
