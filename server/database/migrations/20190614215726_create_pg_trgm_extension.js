exports.up = function(knex, Promise) {
  return knex.schema.raw('CREATE EXTENSION "pg_trgm"');
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('DROP EXTENSION "pg_trgm"');
};
