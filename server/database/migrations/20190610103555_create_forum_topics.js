exports.up = function(knex, Promise) {
  return knex.schema.createTable('forum_topics', (table) => {
    table.increments();
    table.string('name', 50).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('forum_topics');
};
