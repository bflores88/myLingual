const bookshelf = require('../bookshelf');

// require('./User');
require('./QuizContent');
class Quiz extends bookshelf.Model {
  get tableName() {
    return 'quizzes';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
  quiz_contents() {
    return this.hasMany('QuizContent', 'quiz_id');
  }

  decks() {
    return this.belongsTo('Deck', 'deck_id');
  }
}

module.exports = bookshelf.model('Quiz', Quiz);
