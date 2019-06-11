exports.up = function(knex, Promise) {
  return knex.schema.createTable('quizzes', (table) => {
    table.increments();
    table.string('quiz_type', 50).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('quizzes');
};
