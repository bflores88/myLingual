exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('quizzes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('quizzes').insert([{ quiz_type: 'test' }, { quiz_type: 'learn' }, { quiz_type: 'test' }]);
    });
};
