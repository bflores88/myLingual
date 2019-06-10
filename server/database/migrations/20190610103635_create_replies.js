exports.up = function(knex, Promise) {
  return knex.schema.createTable('replies', (table) => {
    table.increments();
    table
      .integer('post_id')
      .notNull()
      .references('id')
      .inTable('posts');
    table
      .integer('sent_by')
      .notNull()
      .references('id')
      .inTable('users');
    table.string('body', 2000).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('replies');
};
