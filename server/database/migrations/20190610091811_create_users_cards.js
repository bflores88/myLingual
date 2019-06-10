exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_cards', (table) => {
    table.increments();
    table
      .integer('user_id')
      .notNull()
      .references('id')
      .inTable('users');
    table
      .integer('card_id')
      .notNull()
      .references('id')
      .inTable('cards');
    table.boolean('success').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions');
};
