const bookshelf = require('../bookshelf');

require('./User');
require('./DeckCard');
require('./Quiz');
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

  decks_cards() {
    return this.hasMany('DeckCard', 'deck_id');
  }

  quizzes() {
    return this.hasMany('Quiz', 'deck_id');
  }
}

module.exports = bookshelf.model('Deck', Deck);
