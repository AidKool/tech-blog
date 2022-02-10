const { Post } = require('../models');

const postData = [
  {
    title: 'I love coding',
    content:
      'Non labore laboris fugiat ullamco exercitation quis consectetur sit irure culpa fugiat. Exercitation dolore non ipsum fugiat eiusmod pariatur ipsum enim esse mollit laboris irure. Sunt consequat culpa sint deserunt deserunt ea et cupidatat ad eiusmod elit adipisicing. Dolor sint quis incididunt amet voluptate. Nostrud ipsum ullamco aute esse nostrud sint qui id eu anim id amet sint.',
    user_id: 1,
  },
  {
    title: "A developer's job is never done!",
    content:
      'Amet incididunt reprehenderit commodo ea incididunt et qui deserunt velit cupidatat in. Cupidatat Lorem cillum velit quis sunt adipisicing ad incididunt ex ea aute et cillum. Aliquip irure reprehenderit id anim. Tempor pariatur in exercitation magna duis dolor voluptate eu. Nostrud velit id ea sunt.',
    user_id: 2,
  },
  {
    title: 'Remember to code every day',
    content:
      'Incididunt cupidatat qui ad dolor eiusmod. Adipisicing commodo eiusmod labore nisi deserunt exercitation irure quis irure proident aliquip quis quis. Dolor eu ullamco ut mollit.',
    user_id: 3,
  },
  {
    title: 'I need to learn advanced data structures',
    content:
      'Nisi ex consectetur incididunt quis duis Lorem elit labore eiusmod adipisicing quis id nisi. Ut et occaecat do sunt aliquip quis irure in. Sunt reprehenderit veniam ut non adipisicing proident esse amet aliqua. Veniam id ea tempor nostrud laborum dolore dolor do veniam incididunt. Deserunt ex eiusmod velit elit elit duis proident velit occaecat veniam sit duis voluptate. Deserunt tempor ex culpa cupidatat nisi ullamco sunt ea.',
    user_id: 4,
  },
  {
    title: 'I love learning algorithms',
    content:
      'Eu velit voluptate elit eiusmod qui excepteur laboris ut esse velit. Ut consectetur officia excepteur commodo do deserunt cillum sunt aute anim esse. Veniam labore officia id quis quis nulla aliquip anim in ea. Deserunt proident non enim cillum occaecat nostrud.',
    user_id: 5,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
