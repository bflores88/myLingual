exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('languages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('languages').insert([
        { english_name: 'spanish', native_name: 'espanol', language_code: 'es' },
        { english_name: 'italian', native_name: 'italiano', language_code: 'it' },
        { english_name: 'english', native_name: 'english', language_code: 'en' },
        { english_name: 'japanese', native_name: '日本人', language_code: 'jp' },
      ]);
    });
};
