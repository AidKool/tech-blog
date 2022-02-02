const { User } = require('../models');

const userData = [
  {
    username: 'little_john',
    password: '12345678',
  },
  {
    username: 'jess',
    password: 'abcdefgh',
  },
  {
    username: 'cranky_pants',
    password: 'asdfghjk',
  },
  {
    username: 'paul',
    password: 'kjhgfdsa',
  },
  {
    username: 'mel',
    password: 'zxcvbnmz',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
