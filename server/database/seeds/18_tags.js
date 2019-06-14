exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('tags').insert([
        { users_cards_id: 1, name: 'Fruits' },
        { users_cards_id: 2, name: 'Groups' },
        { users_cards_id: 3, name: 'Colors' },
      ]);
    });
};
