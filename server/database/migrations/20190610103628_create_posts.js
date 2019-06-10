exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table
      .integer('forum_topic_id')
      .notNull()
      .references('id')
      .inTable('forum_topic');
    table
      .integer('created_by')
      .notNull()
      .references('id')
      .inTable('users');
    table.string('title', 500).notNull();
    table.string('body', 2000).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('replies');
};
