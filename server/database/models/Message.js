const bookshelf = require('../bookshelf');

require('./User');
require('./Conversation');
class Message extends bookshelf.Model {
  get tableName() {
    return 'messages';
  }

  get hasTimestamps() {
    return true;
  }

  conversations() {
    return this.belongsTo('Conversation', 'conversation_id');
  }

  sent_by() {
    return this.belongsTo('User', 'sent_by');
  }

  // add hasMany
}

module.exports = bookshelf.model('Message', Message);
