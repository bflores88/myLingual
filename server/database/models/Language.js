const bookshelf = require('../bookshelf');

require('./ItalianTranslation');
require('./SpanishTranslation');
class Language extends bookshelf.Model {
  get tableName() {
    return 'languages';
  }

  get hasTimestamps() {
    return true;
  }

  spanish_translations() {
    return this.hasMany('SpanishTranslation', 'language_id');
  }

  italian_translations() {
    return this.hasMany('ItalianTranslation', 'language_id');
  }

  users() {
    return this.hasMany('UserLanguage', 'language_id');
  }
}

module.exports = bookshelf.model('Language', Language);
