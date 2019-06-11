const bookshelf = require('../bookshelf');

require('./User');
class Deck extends bookshelf.Model {
  get tableName() {
    return 'decks';
  }

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }

  // add hasMany
}

module.exports = bookshelf.model('Deck', Deck);
