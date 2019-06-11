exports.up = function(knex, Promise) {
  return knex.schema.createTable('languages', (table) => {
    table.increments();
    table.string('english_name', 50).notNull();
    table.string('native_name', 50).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('languages');
};
