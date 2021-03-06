exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_cards')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users_cards').insert([
        { user_id: 1, card_id: 1, attempts: 24, successes: 13 },
        { user_id: 1, card_id: 3, attempts: 50, successes: 45 },
        { user_id: 1, card_id: 4, attempts: 21, successes: 13 },
        { user_id: 1, card_id: 5, attempts: 21, successes: 13 },
        { user_id: 1, card_id: 2, attempts: 212, successes: 193 },
        { user_id: 2, card_id: 1, attempts: 21, successes: 13 },
        { user_id: 2, card_id: 2, attempts: 6, successes: 5 },
        { user_id: 2, card_id: 3, attempts: 21, successes: 13 },
        { user_id: 2, card_id: 5, attempts: 21, successes: 13 },
        { user_id: 3, card_id: 3, attempts: 21, successes: 13 },
        { user_id: 3, card_id: 1, attempts: 21, successes: 13 },
        { user_id: 3, card_id: 2, attempts: 215, successes: 135 },
        { user_id: 3, card_id: 4, attempts: 32, successes: 25 },
        { user_id: 3, card_id: 5, attempts: 2, successes: 2 },
        { user_id: 4, card_id: 1, attempts: 112, successes: 56 },
        { user_id: 4, card_id: 2, attempts: 153, successes: 134 },
        { user_id: 4, card_id: 6, attempts: 132, successes: 121 },
        { user_id: 5, card_id: 7, attempts: 16, successes: 19 },
      ]);
    });
};
