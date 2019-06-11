exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('replies')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('replies').insert([
        {
          post_id: 1,
          sent_by: 4,
          body: 'howzit unko pidign, i think you just need to add an "o" to the end of every word.',
        },
        { post_id: 1, sent_by: 1, body: 'oh forreal? tanks ah' },
        { post_id: 2, sent_by: 3, body: 'that sounds disugsting. You arent even a real captain' },
        { post_id: 3, sent_by: 4, body: 'wow this is going to be useful' },
      ]);
    });
};
