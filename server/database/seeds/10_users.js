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
          private_mode: false,
          role_id: 1,
          username: 'Admin01',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Sally Admin',
          email: 'hobrah@cuzzin.com',
          profile_image_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj3ojtUdc_8iSXycvBIf52zd67Lm16heCEJTyz482ZFdE2sirz',
          lingots: 17000,
        },
        {
          active: true,
          private_mode: false,
          role_id: 1,
          username: 'Admin02',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Curtis Crunch',
          email: 'crunchetizemyshiz@kellogs.com',
          profile_image_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT841fwGucpbtorsXHJucmUHGipOixZ2Gd6QEutqVwd71RDXaYI',
          lingots: 1000,
        },
        {
          active: true,
          private_mode: true,
          role_id: 2,
          username: 'Moderator01',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Mario',
          email: 'takethings@slow.com',
          profile_image_url:
            'https://www.pinclipart.com/picdir/middle/5-59080_clipart-cartoon-faces-cartoon-man-face-png-download.png',
          lingots: 243,
        },
        {
          active: true,
          private_mode: false,
          role_id: 2,
          username: 'Moderator02',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Julio',
          email: 'animaniacs@warnerbros.com',
          profile_image_url: 'https://thumbs.dreamstime.com/b/ragazzo-sorridente-dell-avatar-grafico-73285335.jpg',
          lingots: 1000,
        },
        {
          active: true,
          private_mode: false,
          role_id: 3,
          username: 'User01',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Tony Stark',
          email: 'lasagna@mondays.com',
          profile_image_url: 'https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png',
          lingots: 10,
        },
        {
          active: false,
          private_mode: false,
          role_id: 3,
          username: 'User02',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Miranda',
          email: 'pushups@situps.com',
          profile_image_url:
            'https://cdn2.iconfinder.com/data/icons/cartoon-avatars/128/Avatars_African_American_woman-512.png',
          lingots: 43,
        },
        {
          active: false,
          private_mode: false,
          role_id: 3,
          username: 'User03',
          password: bcrypt.hashSync('password', saltRounds),
          name: 'Gerald',
          email: 'thaynosebear@balance.com',
          profile_image_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLkA4QuCmsYVxsqTdM7ciRkJcooHdeK7wuOqyEEUhZ3e0dq-qwSw',
          lingots: 50,
        },
      ]);
    });
};
