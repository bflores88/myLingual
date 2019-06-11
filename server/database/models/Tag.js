const bookshelf = require('../bookshelf');

// require('./User');
// require('./Card');
class Tag extends bookshelf.Model {
  get tableName() {
    return 'tags';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
}

module.exports = bookshelf.model('Tag', Tag);
