const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  res.status(200).send('<h1>Connection Established</h1>');
});

module.exports = router;
