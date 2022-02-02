const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users have many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

// Posts belongsTo Users
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Posts have many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

// Comments belongsTo Posts
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// Users have many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

// Comments belongsTo Users
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Post,
  Comment,
};
