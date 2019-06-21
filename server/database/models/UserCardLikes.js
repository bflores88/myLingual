const bookshelf = require('../bookshelf');

require('./User');
require('./Card');

class UserCardLikes extends bookshelf.Model {
  get tableName() {
    return 'user_card_likes';
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

module.exports = bookshelf.model('UserCardLikes', UserCardLikes);