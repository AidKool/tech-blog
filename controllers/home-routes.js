const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/login', (_, res) => res.render('login'));
router.get('/signup', (_, res) => res.render('signup'));

router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['id', 'password'],
          },
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    return res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    // return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const postsData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: Comment,
          attributes: {
            exclude: ['post_id'],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: ['password'],
              },
            },
          ],
        },
      ],
      order: [[{ model: Comment }, 'updatedAt', 'DESC']],
    });
    if (!postsData) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    const postAndComments = postsData.get({ plain: true });
    return res.render('single-post', {
      ...postAndComments,
      loggedIn: req.session.loggedIn,
    });
    // return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: { user_id: req.session.user.id },
      order: [['updatedAt', 'DESC']],
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    return res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
