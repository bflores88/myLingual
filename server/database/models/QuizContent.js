const bookshelf = require('../bookshelf');

require('./UserCard');
require('./Quiz');
class QuizContent extends bookshelf.Model {
  get tableName() {
    return 'quiz_contents';
  }

  get hasTimestamps() {
    return true;
  }

  users_cards() {
    return this.belongsTo('UserCard', 'users_cards_id');
  }

  quizzes() {
    return this.belongsTo('Quiz', 'quiz_id');
  }

  // add hasMany
}

module.exports = bookshelf.model('QuizContent', QuizContent);
