const bookshelf = require('../bookshelf');

require('./Post');
class ForumTopic extends bookshelf.Model {
  get tableName() {
    return 'forum_topics';
  }

  get hasTimestamps() {
    return true;
  }

  posts() {
    return this.hasMany('Post', 'forum_topic_id');
  }
}

module.exports = bookshelf.model('ForumTopic', ForumTopic);
