exports.up = function(knex, Promise) {
  return knex.schema.createTable('decks_cards', (table) => {
    table.increments();
    table
      .integer('users_cards_id')
      .notNull()
      .references('id')
      .inTable('users_cards');
    table
      .integer('deck_id')
      .notNull()
      .references('id')
      .inTable('decks');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decks_cards');
};
