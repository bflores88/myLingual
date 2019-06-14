const bcrypt = require('bcryptjs');
const saltRounds = 12;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          active: true,
          role_id: 1,
          username: 'Admin01',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Unko Pidgin',
          email: 'hobrah@cuzzin.com',
          profile_image_url: 'https://www.mauiinformationguide.com/img/_maui/hawaiian-pidgin.jpg',
          lingots: 17000,
        },
        {
          active: true,
          role_id: 1,
          username: 'Admin02',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Captain Crunch',
          email: 'crunchetizemyshiz@kellogs.com',
          profile_image_url:
            'http://296y67419hmo2gej4j232hyf-wpengine.netdna-ssl.com/wp-content/uploads/2013/06/captain-crunch-face.gif',
          lingots: 1000,
        },
        {
          active: true,
          role_id: 2,
          username: 'Moderator01',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Franklin the Turtle',
          email: 'takethings@slow.com',
          profile_image_url: 'https://i.pinimg.com/originals/c8/5e/8e/c85e8e04a643a6f8d39a215ce866b73f.jpg',
          lingots: 243,
        },
        {
          active: true,
          role_id: 2,
          username: 'Moderator02',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Yakko Warner',
          email: 'animaniacs@warnerbros.com',
          profile_image_url:
            'https://vignette.wikia.nocookie.net/animaniacs/images/6/68/Yakko_Warner.png/revision/latest?cb=20130118164439',
          lingots: 1000,
        },
        {
          active: true,
          role_id: 3,
          username: 'User01',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Garfield',
          email: 'lasagna@mondays.com',
          profile_image_url: 'https://images.halloweencostumes.com/products/5644/1-1/child-garfield-costume.jpg',
          lingots: 10,
        },
        {
          active: false,
          role_id: 3,
          username: 'User02',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'One Punch Man',
          email: 'pushups@situps.com',
          profile_image_url:
            'https://img1.ak.crunchyroll.com/i/spire2/b07e7c6942d8d007fdf3bc2c9838322b1559849807_full.png',
          lingots: 43,
        },
      ]);
    });
};
