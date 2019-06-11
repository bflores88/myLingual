exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conversations')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('conversations').insert([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
};
