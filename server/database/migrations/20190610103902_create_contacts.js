exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table
      .integer('requester')
      .notNull()
      .references('id')
      .inTable('users');
    table
      .integer('invitee')
      .notNull()
      .references('id')
      .inTable('users');
    table.boolean('accepted').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
