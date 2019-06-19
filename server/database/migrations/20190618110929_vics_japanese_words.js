exports.up = function(knex, Promise) {
  return knex.schema.createTable('vics_japanese_words', (table) => {
    table.increments();
    table.string('date', 80).notNull();
    table.string('kanji', 50).notNull();
    table.string('hiragana', 50).notNull();
    table.string('romaji', 50).notNull();
    table.string('english', 80).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('vics_japanese_words');
};
