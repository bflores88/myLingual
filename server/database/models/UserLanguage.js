const bookshelf = require('../bookshelf');

require('./User');
require('./Language');
class UserLanguage extends bookshelf.Model {
  get tableName() {
    return 'users_languages';
  }

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }

  languages() {
    return this.belongsTo('Language', 'language_id');
  }

  // add hasMany
}

module.exports = bookshelf.model('UserLanguage', UserLanguage);
