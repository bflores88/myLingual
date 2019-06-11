exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('contacts').insert([
        { requester: 1, invitee: 2, accepted: true },
        { requester: 1, invitee: 3, accepted: true },
        { requester: 1, invitee: 4, accepted: false },
        { requester: 2, invitee: 3, accepted: true },
        { requester: 2, invitee: 4, accepted: true },
        { requester: 3, invitee: 5, accepted: true },
      ]);
    });
};
