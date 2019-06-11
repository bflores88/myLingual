const bookshelf = require('../bookshelf');

require('./User');
require('./DeckCard');
class Deck extends bookshelf.Model {
  get tableName() {
    return 'decks';
  }

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }

  // add hasMany
  decks_cards() {
    return this.hasMany('DeckCard', 'deck_id');
  }
}

module.exports = bookshelf.model('Deck', Deck);
