const bookshelf = require('../bookshelf');

// require('./User');
// require('./Card');
class UserLanguage extends bookshelf.Model {
  get tableName() {
    return 'users_languages';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
}

module.exports = bookshelf.model('UserLanguage', UserLanguage);
