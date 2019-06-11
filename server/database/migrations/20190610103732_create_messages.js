exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table
      .integer('conversation_id')
      .notNull()
      .references('id')
      .inTable('conversations');
    table
      .integer('sent_by')
      .notNull()
      .references('id')
      .inTable('users');
    table.string('body', 1000).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
