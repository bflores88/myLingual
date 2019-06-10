exports.up = function(knex, Promise) {
  return knex.schema.createTable('conversations', (table) => {
    table.increments();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('conversations');
};
