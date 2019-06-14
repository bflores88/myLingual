exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('card_themes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('card_themes').insert([
        { name: 'Default' },
        { name: 'Dark' },
        { name: 'Spicy' },
        { name: 'Cool' },
        { name: 'Space' },
      ]);
    });
};
