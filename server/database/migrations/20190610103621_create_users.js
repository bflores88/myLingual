exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.boolean('active').notNull();
    table
      .integer('role_id')
      .references('id')
      .inTable('roles');
    table
      .string('username', 20)
      .notNull()
      .unique();
    table.string('oauth_token', 255);
    table.string('password', 100);
    table.string('name', 100);
    table.string('email', 100);
    table.string('profile_image_url', 255);

    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
