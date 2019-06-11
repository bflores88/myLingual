exports.up = function(knex, Promise) {
  return knex.schema.createTable('italian_translations', (table) => {
    table.increments();
    table
      .integer('word_id')
      .notNull()
      .references('id')
      .inTable('words');
    table
      .integer('language_id')
      .notNull()
      .references('id')
      .inTable('languages');
    table.string('italian_word', 50).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('italian_translations');
};
