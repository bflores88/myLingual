const bookshelf = require('../bookshelf');

// require('./User');
// require('./Card');
class QuizContent extends bookshelf.Model {
  get tableName() {
    return 'quiz_contents';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
}

module.exports = bookshelf.model('QuizContent', QuizContent);
