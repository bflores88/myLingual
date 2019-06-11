const bookshelf = require('../bookshelf');

// require('./User');
// require('./Card');
class DeckCard extends bookshelf.Model {
  get tableName() {
    return 'decks_cards';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
}

module.exports = bookshelf.model('DeckCard', DeckCard);
