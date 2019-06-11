exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('words')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('words').insert([{ english_word: 'banana' }, { english_word: 'chain' }, { english_word: 'camel' }]);
    });
};
