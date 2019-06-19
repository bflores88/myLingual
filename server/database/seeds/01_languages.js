exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('languages')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('languages').insert([
        { english_name: 'spanish', native_name: 'español', language_code: 'es', flag_link: 'https://mylingual-images.s3-us-west-2.amazonaws.com/spain_flag.png' },
        { english_name: 'italian', native_name: 'italiano', language_code: 'it', flag_link: 'https://mylingual-images.s3-us-west-2.amazonaws.com/italy_flag.png' },
        { english_name: 'english', native_name: 'english', language_code: 'en', flag_link: 'https://mylingual-images.s3-us-west-2.amazonaws.com/usa_flag.png' },
        { english_name: 'japanese', native_name: '日本語', language_code: 'ja', flag_link: 'https://mylingual-images.s3-us-west-2.amazonaws.com/japan_flag.png' },
      ]);
    });
};
