const bookshelf = require('../bookshelf');

require('./Role');
require('./UserCard');
require('./Message');
require('./UserConversation');
require('./Post');
require('./Reply');
require('./Deck');
require('./Card');
class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimestamps() {
    return true;
  }

  roles() {
    return this.belongsTo('Role', 'role_id');
  }

  cards() {
    return this.hasMany('UserCard', 'user_id');
  }

  sent_messages() {
    return this.hasMany('Message', 'sent_by');
  }

  conversations() {
    return this.hasMany('UserConversation', 'user_id');
  }

  created_posts() {
    return this.hasMany('Post', 'created_by');
  }

  replies() {
    return this.hasMany('Reply', 'sent_by');
  }

  decks() {
    return this.hasMany('Deck', 'user_id');
  }

  created_cards() {
    return this.hasMany('Card', 'created_by');
  }
}

module.exports = bookshelf.model('User', User);
