
exports.up = function(knex, Promise) {
  return knex.schema.table('languages', function(table) {
    table.string('code', 5).notNull().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('languages', function(table) {
    table.dropColumn('languages');
  })
};
