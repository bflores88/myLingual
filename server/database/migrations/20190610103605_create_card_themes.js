exports.up = function(knex, Promise) {
  return knex.schema.createTable('card_themes', (table) => {
    table.increments();
    table.string('name', 50).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('card_themes');
};
