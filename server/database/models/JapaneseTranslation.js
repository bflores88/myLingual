const bookshelf = require('../bookshelf');

require('./Word');
require('./Language');
require('./ItalianTranslation');
class JapaneseTranslation extends bookshelf.Model {
  get tableName() {
    return 'japanese_translations';
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

  italian_translations() {
    return this.hasOne('ItalianTranslation', 'word_id');
  }

  // add hasMany
}

module.exports = bookshelf.model('JapaneseTranslation', JapaneseTranslation);
