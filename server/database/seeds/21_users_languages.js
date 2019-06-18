exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_languages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users_languages').insert([
        { user_id: 1, language_id: 1, language_type: 'target', primary: true, active: true },
        { user_id: 1, language_id: 2, language_type: 'target', primary: false, active: true },
        { user_id: 2, language_id: 1, language_type: 'target', primary: true, active: true },
        { user_id: 3, language_id: 2, language_type: 'target', primary: true, active: true },
        { user_id: 4, language_id: 2, language_type: 'target', primary: false, active: true },
        { user_id: 4, language_id: 4, language_type: 'target', primary: true, active: true },
        { user_id: 5, language_id: 1, language_type: 'target', primary: true, active: true },
        { user_id: 6, language_id: 3, language_type: 'target', primary: true, active: true },
        { user_id: 7, language_id: 2, language_type: 'target', primary: true, active: true },
        { user_id: 1, language_id: 3, language_type: 'native', primary: true, active: true },
        { user_id: 2, language_id: 3, language_type: 'native', primary: true, active: true },
        { user_id: 3, language_id: 3, language_type: 'native', primary: true, active: true },
        { user_id: 4, language_id: 3, language_type: 'native', primary: true, active: true },
        { user_id: 5, language_id: 3, language_type: 'native', primary: true, active: true },
        { user_id: 6, language_id: 1, language_type: 'native', primary: true, active: true },
        { user_id: 7, language_id: 3, language_type: 'native', primary: true, active: true },
      ]);
    });
};
