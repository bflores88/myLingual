exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('italian_translations')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('italian_translations').insert([
        { word_id: 1, language_id: 2, italian_word: 'banana' },
        { word_id: 2, language_id: 2, italian_word: 'catena' },
        { word_id: 3, language_id: 2, italian_word: 'squadra' },
        { word_id: 4, language_id: 2, italian_word: 'blu' },
        { word_id: 5, language_id: 2, italian_word: 'falco' },
      ]);
    });
};
