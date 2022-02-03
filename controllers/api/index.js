const router = require('express').Router();

const postsRoutes = require('./posts-routes');
const usersRoutes = require('./users-routes');
const commentsRoutes = require('./comments-routes');

router.use('/posts', postsRoutes);
router.use('/users', usersRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
