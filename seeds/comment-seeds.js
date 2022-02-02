const { Comment } = require('../models');

const commentData = [
  {
    content: 'so proud of you!',
    user_id: 1,
    post_id: 1,
  },
  {
    content: 'yeah!!!! so proud of you!',
    user_id: 2,
    post_id: 1,
  },
  {
    content: 'well done little man!',
    user_id: 3,
    post_id: 2,
  },
  {
    content: 'hey jess, good to see you here!',
    user_id: 2,
    post_id: 3,
  },
  {
    content: 'nice post!',
    user_id: 3,
    post_id: 4,
  },
  {
    content: 'yes you are!',
    user_id: 4,
    post_id: 5,
  },
  {
    content: "I don't know!!",
    user_id: 5,
    post_id: 6,
  },
  {
    content: 'yeah not really...',
    user_id: 4,
    post_id: 7,
  },
  {
    content: 'do you need to ask?',
    user_id: 3,
    post_id: 8,
  },
  {
    content: 'getting old? :O',
    user_id: 2,
    post_id: 9,
  },
  {
    content: 'seriously?',
    user_id: 4,
    post_id: 10,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
