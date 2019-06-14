const bookshelf = require('../bookshelf');

require('./Word');
require('./CardTheme');
require('./User');
require('./UserCard');
class Card extends bookshelf.Model {
  get tableName() {
    return 'cards';
  }

  get hasTimestamps() {
    return true;
  }

  words() {
    return this.belongsTo('Word', 'word_id');
  }

  card_themes() {
    return this.belongsTo('CardTheme', 'card_theme_id');
  }

  created_by() {
    return this.belongsTo('User', 'created_by');
  }

  users() {
    return this.hasMany('UserCard', 'card_id');
  }
}

module.exports = bookshelf.model('Card', Card);
