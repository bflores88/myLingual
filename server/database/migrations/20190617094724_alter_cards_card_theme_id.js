exports.up = function(knex, Promise) {
  return knex.schema.alterTable('cards', (table) => {
    table.dropColumn('card_theme_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('cards', (table) => {
    table
      .integer('card_theme_id')
      .notNull()
      .references('id')
      .inTable('card_themes');
  });
};
