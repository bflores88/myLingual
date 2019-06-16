exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('spanish_translations')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('spanish_translations').insert([
        { word_id: 1, language_id: 1, spanish_word: 'plátano' },
        { word_id: 2, language_id: 1, spanish_word: 'cadena' },
        { word_id: 3, language_id: 1, spanish_word: 'pandilla' },
        { word_id: 4, language_id: 1, spanish_word: 'azul' },
        { word_id: 5, language_id: 1, spanish_word: 'halcón' },
        { word_id: 6, language_id: 1, spanish_word: 'serpiente' },
      ]);
    });
};
