exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', (table) => {
    table.increments();
    table
      .integer('users_cards_id')
      .notNull()
      .references('id')
      .inTable('users_cards');
    table.string('name', 40).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
