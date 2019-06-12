const bookshelf = require('../bookshelf');

require('./User');
class Role extends bookshelf.Model {
  get tableName() {
    return 'roles';
  }

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.hasMany('User', 'role_id');
  }
}

module.exports = bookshelf.model('Role', Role);
