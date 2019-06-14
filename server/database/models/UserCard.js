const bookshelf = require('../bookshelf');

require('./User');
require('./Card');
require('./Tag');
require('./QuizContent');
require('./DeckCard');
class UserCard extends bookshelf.Model {
  get tableName() {
    return 'users_cards';
  }

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }

  cards() {
    return this.belongsTo('Card', 'card_id');
  }

  tags() {
    return this.hasMany('Tag', 'users_cards_id');
  }

  quiz_contents() {
    return this.hasMany('QuizContent', 'users_cards_id');
  }

  decks_cards() {
    return this.hasMany('DeckCard', 'users_cards_id');
  }
}

module.exports = bookshelf.model('UserCard', UserCard);
