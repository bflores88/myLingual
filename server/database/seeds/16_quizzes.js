exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('quizzes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('quizzes').insert([
        { quiz_type: 'learn', deck_id: 1 },
        { quiz_type: 'test', deck_id: 2 },
        { quiz_type: 'test', deck_id: 1 },
      ]);
    });
};
