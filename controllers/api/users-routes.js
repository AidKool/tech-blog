const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ['id', 'password'],
      },
    });
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      return res
        .status(404)
        .json({ message: 'Login failed. Please try again.' });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Login failed. Please try again.' });
    }
    return res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/signup', async (req, res) => {
  try {
    await User.create(req.body);
    return res.status(201).json({ message: 'Signup successful.' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;