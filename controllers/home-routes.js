const router = require('express').Router();
const { User, Post, Comment } = require('../models');

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
    const posts = postsData.map((post) => post.get({ plain: true }));
    return res.render('homepage', { posts });
    // return res.status(200).json(postsData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const postsData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: {
//             exclude: ['password'],
//           },
//         },
//         {
//           model: Comment,
//           include: [
//             {
//               model: User,
//               attributes: {
//                 exclude: ['password'],
//               },
//             },
//           ],
//         },
//       ],
//     });
//     if (!postsData) {
//       return res.status(404).json({ message: 'Post not found.' });
//     }
//     return res.status(200).json(postsData);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

module.exports = router;
