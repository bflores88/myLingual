exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('japanese_translations')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('japanese_translations').insert([
        { word_id: 1, language_id: 4, japanese_word: 'バナナ' },
        { word_id: 2, language_id: 4, japanese_word: '鎖' },
        { word_id: 3, language_id: 4, japanese_word: 'ギャング' },
        { word_id: 4, language_id: 4, japanese_word: '青' },
        { word_id: 5, language_id: 4, japanese_word: 'ファルコン' },
        { word_id: 6, language_id: 4, japanese_word: 'ヘビ' },
      ]);
    });
};
