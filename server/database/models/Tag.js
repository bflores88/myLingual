const bookshelf = require('../bookshelf');

require('./UserCard');
class Tag extends bookshelf.Model {
  get tableName() {
    return 'tags';
  }

  get hasTimestamps() {
    return true;
  }

  users_cards() {
    return this.belongsTo('UserCard', 'users_cards_id');
  }

  // add hasMany
}

module.exports = bookshelf.model('Tag', Tag);
