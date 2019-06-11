exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('languages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('languages').insert([
        { english_name: 'spanish', native_name: 'espanol' },
        { english_name: 'italian', native_name: 'italiano' },
        {english_name: 'english', native_name: 'english'}
      ]);
    });
};
