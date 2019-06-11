const bookshelf = require('../bookshelf');

require('./User');
class Contact extends bookshelf.Model {
  get tableName() {
    return 'contacts';
  }

  get hasTimestamps() {
    return true;
  }

  requesters() {
    return this.belongsTo('User', 'requestor');
  }

  invitees() {
    return this.belongsTo('User', 'invitee');
  }
}

module.exports = bookshelf.model('Contact', Contact);
