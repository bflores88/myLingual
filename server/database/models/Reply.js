const bookshelf = require('../bookshelf');

require('./User');
require('./Post');
class Reply extends bookshelf.Model {
  get tableName() {
    return 'replies';
  }

  get hasTimestamps() {
    return true;
  }

  posts() {
    return this.belongsTo('Post', 'post_id');
  }

  created_by() {
    return this.belongsTo('User', 'sent_by');
  }
}

module.exports = bookshelf.model('Reply', Reply);
