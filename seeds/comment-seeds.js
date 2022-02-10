const { Comment } = require('../models');

const commentData = [
  {
    content: 'I totally agree!',
    user_id: 5,
    post_id: 1,
  },
  {
    content: 'Fair point',
    user_id: 4,
    post_id: 3,
  },
  {
    content: 'Definitely!',
    user_id: 3,
    post_id: 2,
  },
  {
    content: 'Learning never ends!',
    user_id: 2,
    post_id: 4,
  },
  {
    content: 'nice post!',
    user_id: 1,
    post_id: 5,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
