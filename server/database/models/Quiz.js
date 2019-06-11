const bookshelf = require('../bookshelf');

// require('./User');
// require('./Card');
class Quiz extends bookshelf.Model {
  get tableName() {
    return 'quizzes';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
}

module.exports = bookshelf.model('Quiz', Quiz);
