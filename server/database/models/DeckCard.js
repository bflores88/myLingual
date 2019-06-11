const bookshelf = require('../bookshelf');

require('./UserCard');
require('./Deck');
class DeckCard extends bookshelf.Model {
  get tableName() {
    return 'decks_cards';
  }

  get hasTimestamps() {
    return true;
  }

  users_cards() {
    return this.belongsTo('UserCard', 'users_cards_id');
  }

  decks() {
    return this.belongsTo('Deck', 'deck_id');
  }

  // add hasMany
}

module.exports = bookshelf.model('DeckCard', DeckCard);
