const bookshelf = require('../bookshelf');

// require('./User');
// require('./Card');
class Contact extends bookshelf.Model {
  get tableName() {
    return 'contacts';
  }

  get hasTimestamps() {
    return true;
  }

  // add hasMany
}

module.exports = bookshelf.model('Contact', Contact);
