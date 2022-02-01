const router = require('express').Router();

router.get('/', async (req, res) => {
  res.status(200).send('<h1>Connection Established</h1>');
});

module.exports = router;
