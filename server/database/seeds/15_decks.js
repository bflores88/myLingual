exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('decks').insert([
        { user_id: 1, name: 'test1' },
        { user_id: 2, name: 'test2' },
        { user_id: 3, name: 'test3' },
        { user_id: 4, name: 'test4' },
        { user_id: 5, name: 'test5' },
        { user_id: 1, name: 'test6' },
        { user_id: 6, name: 'test7' },
      ]);
    });
};
