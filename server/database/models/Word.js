const bookshelf = require('../bookshelf');

require('./ItalianTranslation');
require('./SpanishTranslation');
require('./Card');
class Word extends bookshelf.Model {
  get tableName() {
    return 'words';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
  spanish_translations() {
    return this.hasOne('SpanishTranslation', 'word_id');
  }

  italian_translations() {
    return this.hasOne('ItalianTranslation', 'word_id');
  }

  cards() {
    return this.hasMany('Card', 'word_id');
  }
}

module.exports = bookshelf.model('Word', Word);
