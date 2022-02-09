const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // await Post.create({ ...req.body, user_id: req.session.user.id });
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user.id,
    });
    // await Post.create(req.body);
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
    await Post.update(
      { ...req.body, updated: true },
      {
        where: { id: req.params.id },
      }
    );
    const postsData = await Post.findByPk(req.params.id);
    if (!postsData) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postsData = await Post.destroy({ where: { id: req.params.id } });
    if (!postsData) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
