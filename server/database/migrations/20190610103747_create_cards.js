exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', (table) => {
    table.increments();
    table
      .integer('word_id')
      .notNull()
      .references('id')
      .inTable('words');
    table
      .integer('card_theme_id')
      .notNull()
      .references('id')
      .inTable('card_themes');
    table
      .integer('created_by')
      .notNull()
      .references('id')
      .inTable('users');
    table.integer('likes').notNull();
    table.integer('shares').notNull();
    table.integer('red_flagged').notNull();
    table.integer('downloads').notNull();
    table.string('image_link', 255);
    table.boolean('approved').notNull();
    table.boolean('public').notNull();
    table.boolean('active').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};
