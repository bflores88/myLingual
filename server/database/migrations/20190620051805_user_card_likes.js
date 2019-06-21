
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_card_likes', (table) => {
    table.increments();
    table.integer('user_id').notNull().references('id').inTable('users');
    table.integer('card_id').notNull().references('id').inTable('cards');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_card_likes');
};
