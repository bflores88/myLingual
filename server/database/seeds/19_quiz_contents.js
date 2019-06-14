exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('quiz_contents')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('quiz_contents').insert([
        { users_cards_id: 1, quiz_id: 1, attempts: 10, successes: 9 },
        { users_cards_id: 2, quiz_id: 1, attempts: 15, successes: 9 },
        { users_cards_id: 3, quiz_id: 1, attempts: 5, successes: 3 },
        { users_cards_id: 6, quiz_id: 2, attempts: 10, successes: 9 },
        { users_cards_id: 7, quiz_id: 2, attempts: 15, successes: 9 },
        { users_cards_id: 8, quiz_id: 2, attempts: 5, successes: 3 },
      ]);
    });
};
