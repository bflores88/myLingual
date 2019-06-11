const bookshelf = require('../bookshelf');

require('./UserConversation');
require('./Message');
class Conversation extends bookshelf.Model {
  get tableName() {
    return 'conversations';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
  users() {
    return this.hasMany('UserConversation', 'conversation_id');
  }

  messages() {
    return this.hasMany('Message', 'conversation_id');
  }
}

module.exports = bookshelf.model('Conversation', Conversation);
