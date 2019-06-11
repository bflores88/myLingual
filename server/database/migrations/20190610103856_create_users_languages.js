exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_languages', (table) => {
    table.increments();
    table
      .integer('user_id')
      .notNull()
      .references('id')
      .inTable('users');
    table
      .integer('language_id')
      .notNull()
      .references('id')
      .inTable('users');
    table.string('language_type', 15).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_languages');
};
