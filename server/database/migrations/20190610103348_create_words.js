exports.up = function(knex, Promise) {
  return knex.schema.createTable('words', (table) => {
    table.increments();
    table.string('english_word', 50).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('words');
};
