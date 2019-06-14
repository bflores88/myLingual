exports.up = function(knex, Promise) {
  return knex.schema.alterTable('quizzes', (table) => {
    table
      .integer('deck_id')
      .notNull()
      .references('id')
      .inTable('decks');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('quizzes', (table) => {
    table.dropColumn('deck_id');
  });
};
