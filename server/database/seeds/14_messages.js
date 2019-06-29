exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('messages').insert([
        { conversation_id: 1, sent_by: 1, body: 'Hello everyone here is a group chat!' },
        { conversation_id: 1, sent_by: 2, body: 'Wow awesome!' },
        { conversation_id: 1, sent_by: 3, body: 'Absolutely smashin!' },
        { conversation_id: 2, sent_by: 1, body: 'Hello?' },
        { conversation_id: 3, sent_by: 4, body: 'Hello you!' },
        { conversation_id: 3, sent_by: 5, body: 'How did you get this number?' },
      ]);
    });
};
