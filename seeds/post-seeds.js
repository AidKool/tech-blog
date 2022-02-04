const { Post } = require('../models');

const postData = [
  {
    title: 'This is cranky_pants first post',
    content: 'cranky_pants has written his first blog post!',
    user_id: 1,
  },
  {
    title: 'This is cranky_pants second post',
    content: 'Another blog post by cranky_pants!',
    user_id: 1,
  },
  {
    title: "jess's first post",
    content: 'I like to write!!!',
    user_id: 2,
  },
  {
    title: 'another post (by jess)',
    content: 'I did say I like to write!',
    user_id: 2,
  },
  {
    title: 'First post by little_john',
    content: 'getting there!',
    user_id: 3,
  },
  {
    title: 'little_john is on a roll!',
    content: 'yeah baby!',
    user_id: 3,
  },
  {
    title: "I'm paul and I'm cool",
    content: 'or so I think...',
    user_id: 4,
  },
  {
    title: 'another post by the wannabe cool guy',
    content: "why doesn't anyone think I'm cool!!?",
    user_id: 4,
  },
  {
    title: 'I think I was in the spice girls',
    content: "or maybe not, I don't remember anything anymore...",
    user_id: 5,
  },
  {
    title: 'if you wanna be my lover...',
    content: "I can't believe I forgot the rest of the song!!",
    user_id: 5,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
