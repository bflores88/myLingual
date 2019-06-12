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
          title: 'Fo how to speak spanish?',
          body: 'Sup braddahs, my hunneh girl is from spain and I like learn spanish fo talk wit her. Like teach me?',
        },
        {
          forum_topic_id: 3,
          created_by: 2,
          title: 'Is anyone interested in pizza flavored cereal',
          body:
            'After learning how to speak Italian fluently thanks to MyLingual, I have gained new inspiration to make revolutionary cereals. This brings me to my new idea: pizza flavored cereal.',
        },
        {
          forum_topic_id: 4,
          created_by: 3,
          title: 'This is the general posts forum',
          body: 'Cant think of a good place for a new thread? Put it in here.',
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
          title: 'What to do after eating too much taco bell',
          body:
            'I had a Grande DORITOS® Cool Ranch XXL Chalupa BorderBlast™ for breakfast, and now my insides feel like they are waging civil war against each other. Anyone have some remedies for this timeless conundrum?',
        },
      ]);
    });
};
