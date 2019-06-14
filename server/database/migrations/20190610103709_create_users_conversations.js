exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_conversations', (table) => {
    table.increments();
    table
      .integer('user_id')
      .notNull()
      .references('id')
      .inTable('users');
    table
      .integer('conversation_id')
      .notNull()
      .references('id')
      .inTable('conversations');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_conversations');
};
