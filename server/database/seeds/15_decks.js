exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('decks').insert([
        { user_id: 1 },
        { user_id: 2 },
        { user_id: 3 },
        { user_id: 4 },
        { user_id: 5 },
        { user_id: 1 },
        { user_id: 6 },
      ]);
    });
};
