const bookshelf = require('../bookshelf');

require('./Card');
class CardTheme extends bookshelf.Model {
  get tableName() {
    return 'card_themes';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
  cards() {
    return this.hasMany('Card', 'card_theme_id');
  }
}

module.exports = bookshelf.model('CardTheme', CardTheme);
