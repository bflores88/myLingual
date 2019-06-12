const bookshelf = require('../bookshelf');

require('./User');
require('./Conversation');
class UserConversation extends bookshelf.Model {
  get tableName() {
    return 'users_conversations';
  }

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }

  conversations() {
    return this.belongsTo('Conversation', 'conversation_id');
  }

  // add hasMany
}

module.exports = bookshelf.model('UserConversation', UserConversation);
