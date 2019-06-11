exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('messages').insert([
        { conversation_id: 1, sent_by: 1, body: 'howzit boys I just made one group chat' },
        { conversation_id: 1, sent_by: 2, body: 'shoo0000OOOtzzzz cuz' },
        { conversation_id: 1, sent_by: 3, body: 'brah this is shmeeannnnn' },
        { conversation_id: 2, sent_by: 1, body: 'no one is in this convo' },
        { conversation_id: 3, sent_by: 4, body: 'hello sir' },
        { conversation_id: 3, sent_by: 5, body: 'dont message me ever again nerd' },
      ]);
    });
};
