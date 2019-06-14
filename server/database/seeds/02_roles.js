exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('roles').insert([{ name: 'admin' }, { name: 'moderator' }, { name: 'user' }]);
    });
};
