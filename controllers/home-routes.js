const router = require('express').Router();
const { compareAsc } = require('date-fns');
const { User, Post, Comment } = require('../models');

router.get('/login', (_, res) => res.render('login'));
router.get('/signup', (_, res) => res.render('signup'));

router.get('/', async (_, res) => {
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
    });
    const posts = postsData
      .map((post) => post.get({ plain: true }))
      .sort((post1, post2) =>
        compareAsc(new Date(post2.updatedAt), new Date(post1.updatedAt))
      );
    return res.render('homepage', { posts });
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
    });
    if (!postsData) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    const postAndComments = postsData.get({ plain: true });
    return res.render('single-post', postAndComments);
    // return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
