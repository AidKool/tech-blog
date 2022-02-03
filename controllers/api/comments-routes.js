const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    await Comment.create(req.body);
    return res.status(201).json({ message: 'Message posted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Comment.update(req.body, { where: { id: req.params.id } });
    const commentsData = await Comment.findByPk(req.params.id);
    if (!commentsData) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res.status(200).json({ message: 'Message updated successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
