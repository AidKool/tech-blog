const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (_, res) => {
  try {
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
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
    return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    await Post.create(req.body);
    const postsData = await Post.findOne({
      where: { title: req.body.title },
    });
    return res.status(201).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Post.update(req.body, {
      where: { id: req.params.id },
    });
    const postsData = await Post.findByPk(req.params.id);
    if (!postsData) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
