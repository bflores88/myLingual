exports.up = function(knex, Promise) {
  return knex.schema.alterTable('contacts', (table) => {
    table.boolean('responded').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('contacts', (table) => {
    table.dropColumn('responded');
  });
};
