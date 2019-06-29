exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        {
          forum_topic_id: 2,
          created_by: 1,
          title: 'I would like to learn how to speak spanish',
          body: 'Hello everyone, any tips on how to learn spanish?',
        },
        {
          forum_topic_id: 3,
          created_by: 2,
          title: 'I love the italian language',
          body: 'Who else loves this language?',
        },
        {
          forum_topic_id: 4,
          created_by: 3,
          title: 'This is the Japanese Forum',
          body: 'Practice your japanese here.',
        },
        {
          forum_topic_id: 2,
          created_by: 3,
          title: 'Hola como esta mi amigos',
          body: 'Donde esta la biblioteca?',
        },
        {
          forum_topic_id: 2,
          created_by: 4,
          title: 'Anyone have good food recipes to help me study?',
          body: 'I would like to get authentic recipes to eat while I study.',
        },
        {
          forum_topic_id: 1,
          created_by: 2,
          title: 'To those learning English: good luck!',
          body: 'English is cool!',
        },
      ]);
    });
};
