const bookshelf = require('../bookshelf');

require('./User');

class VicsJapaneseWord extends bookshelf.Model {
  get tableName() {
    return 'vics_japanese_words';
  }

  get hasTimestamps() {
    return true;
  }
}

module.exports = bookshelf.model('VicsJapaneseWord', VicsJapaneseWord);
