exports.up = function(knex, Promise) {
  return knex.schema.createTable('quiz_contents', (table) => {
    table.increments();
    table
      .integer('users_cards_id')
      .notNull()
      .references('id')
      .inTable('users_cards');
    table
      .integer('quiz_id')
      .notNull()
      .references('id')
      .inTable('quizzes');
    table.integer('attempts').notNull();
    table.integer('successes').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('quiz_contents');
};
