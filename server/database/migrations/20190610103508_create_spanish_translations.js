exports.up = function(knex, Promise) {
  return knex.schema.createTable('spanish_translations', (table) => {
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
    table.string('spanish_word', 50).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('spanish_translations');
};
