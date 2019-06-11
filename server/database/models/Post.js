const bookshelf = require('../bookshelf');

require('./ForumTopic');
require('./User');
require('./Reply');
class Post extends bookshelf.Model {
  get tableName() {
    return 'posts';
  }

  get hasTimestamps() {
    return true;
  }

  forum_topics() {
    return this.belongsTo('ForumTopic', 'forum_topic_id');
  }

  created_by() {
    return this.belongsTo('User', 'created_by');
  }

  // add hasMany
  replies() {
    return this.hasMany('Reply', 'post_id');
  }
}

module.exports = bookshelf.model('Post', Post);
