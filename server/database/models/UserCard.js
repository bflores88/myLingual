const bookshelf = require('../bookshelf');

require('./User');
require('./Card');
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
}

module.exports = bookshelf.model('UserCard', UserCard);
