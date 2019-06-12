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
        { post_id: 2, sent_by: 3, body: 'that sounds disugsting old man. You arent even a real captain' },
        {
          post_id: 2,
          sent_by: 2,
          body: 'watch yo damn mouth boy this old man was making millions while you were in yo mommas belly',
        },
        { post_id: 2, sent_by: 3, body: 'frosted flakes are way better than the trash you serve' },
        { post_id: 3, sent_by: 4, body: 'wow this is going to be useful' },
        {
          post_id: 5,
          sent_by: 1,
          body:
            'cheee hee brah I get the same way after pounding one Zippys Family Pak with 20 piece chicken and 2 gallon chili vat. best to strap in and get ready for the rodeo.',
        },
        { post_id: 5, sent_by: 4, body: 'it feels like there is a dark and terrible evil brewing inside me' },
        {
          post_id: 6,
          sent_by: 5,
          body: 'ダムアメリカ人は私達が英語を理解することができないと思う',
        },
        {
          post_id: 6,
          sent_by: 2,
          body: 'what did you just call me',
        },
      ]);
    });
};
