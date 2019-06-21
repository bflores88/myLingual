exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('forum_topics')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('forum_topics').insert([
        { name: 'English' },
        { name: 'Spanish' },
        { name: 'Italian' },
        { name: 'Japanese' },
        { name: 'Random' },
      ]);
    });
};
