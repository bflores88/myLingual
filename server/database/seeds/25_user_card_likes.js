
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_card_likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_card_likes').insert([
        { user_id: 1, card_id: 1 },
        { user_id: 1, card_id: 2 },
        { user_id: 1, card_id: 3 },
        { user_id: 2, card_id: 4 },
        { user_id: 2, card_id: 5 },
        { user_id: 2, card_id: 6 },
        { user_id: 3, card_id: 7 },
        { user_id: 3, card_id: 6 },
        { user_id: 3, card_id: 5 }
      ]);
    });
};
