exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks_cards')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('decks_cards').insert([
        { users_cards_id: 1, deck_id: 1 },
        { users_cards_id: 2, deck_id: 1 },
        { users_cards_id: 3, deck_id: 1 },
        { users_cards_id: 4, deck_id: 1 },
        { users_cards_id: 5, deck_id: 1 },
        { users_cards_id: 6, deck_id: 2 },
        { users_cards_id: 7, deck_id: 2 },
        { users_cards_id: 8, deck_id: 2 },
      ]);
    });
};
