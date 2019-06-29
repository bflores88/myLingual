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
          body: 'Yes I agree!',
        },
        { post_id: 1, sent_by: 1, body: 'Gotta love it!' },
        { post_id: 2, sent_by: 3, body: 'So much culture!' },
        {
          post_id: 2,
          sent_by: 2,
          body: 'Indubitably.',
        },
        { post_id: 2, sent_by: 3, body: 'Mmm yes quite indeed.' },
        { post_id: 3, sent_by: 4, body: 'wow this is going to be useful' },
        {
          post_id: 5,
          sent_by: 1,
          body: 'I have a secret enchilada recipe.',
        },
        { post_id: 5, sent_by: 4, body: 'I would like that very much please.' },
        {
          post_id: 6,
          sent_by: 5,
          body: 'ダムアメリカ人は私達が英語を理解することができないと思う',
        },
        {
          post_id: 6,
          sent_by: 2,
          body: 'Haha yes of course!',
        },
      ]);
    });
};
