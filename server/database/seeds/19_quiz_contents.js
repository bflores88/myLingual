exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('quiz_contents')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('quiz_contents').insert([
        { users_cards_id: 1, quiz_id: 2, attempts: 1, successes: 1 },
        { users_cards_id: 2, quiz_id: 2, attempts: 1, successes: 1 },
        { users_cards_id: 3, quiz_id: 2, attempts: 1, successes: 1 },
        { users_cards_id: 4, quiz_id: 2, attempts: 1, successes: 1 },
        { users_cards_id: 5, quiz_id: 2, attempts: 1, successes: 1 },
      ]);
    });
};
