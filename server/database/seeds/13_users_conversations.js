exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_conversations')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users_conversations').insert([
        { user_id: 2, conversation_id: 1 },
        { user_id: 1, conversation_id: 1 },
        { user_id: 3, conversation_id: 1 },
        { user_id: 1, conversation_id: 2 },
        { user_id: 4, conversation_id: 3 },
        { user_id: 5, conversation_id: 3 },
      ]);
    });
};
