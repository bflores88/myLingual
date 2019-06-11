const bookshelf = require('../bookshelf');

require('./Word');
require('./Language');
require('./SpanishTranslation');
class ItalianTranslation extends bookshelf.Model {
  get tableName() {
    return 'italian_translations';
  }

  get hasTimestamps() {
    return true;
  }

  words() {
    return this.belongsTo('Word', 'word_id');
  }

  languages() {
    return this.belongsTo('Language', 'language_id');
  }

  spanish_translations() {
    return this.hasOne('SpanishTranslation', 'word_id');
  }

  // add hasMany
}

module.exports = bookshelf.model('ItalianTranslation', ItalianTranslation);
