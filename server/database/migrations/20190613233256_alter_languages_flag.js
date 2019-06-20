exports.up = function (knex, Promise) {
  return knex.schema.table('languages', function (table) {
    table.string('flag_link', 255);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('languages', function (table) {
    table.dropColumn('flag_link');
  });
};
