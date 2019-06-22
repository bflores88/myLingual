'use strict';

const express = require('express');
const router = express.Router();
const Deck = require('../database/models/Deck');
const User = require('../database/models/User');
const authGuard = require('../guards/authGuard');
const modGuard = require('../guards/modGuard');

router.route('/all').get(authGuard, modGuard, (req, res) => {
  new Deck()
    .fetchAll({ withRelated: ['users', 'decks_cards.users_cards.cards'] })
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});


router.route('/').get(authGuard, (req, res) => {
  console.log(req.user);

  new Deck()
    .where({ user_id: req.user.id })
    .fetchAll()
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// post new deck

router.route('/').post(authGuard, (req, res) => {
  // console.log(req.body);
  new Deck({
    user_id: req.user.id,
    name: req.body.name,
  })
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// grab specific deck w/ cards

// router.route('/:id').get((req, res) => {
//   console.log(req.user);
//   new Deck()
//     .where({ id: req.params.id })
//     .fetchAll({ withRelated: ['decks_cards.users_cards.cards.words.spanish_translations'] })
//     .then((result) => {
//       return res.send(result.toJSON());
//     })
//     .catch((err) => {
//       console.log('error', err);
//     });
// });

// grab deck with target language attempt

router.route('/:id').get(authGuard, (req, res) => {
  console.log(req.user);
  new User()
    .where({ id: req.user.id })
    .fetchAll({ withRelated: ['languages.languages'] })
    .then((result) => {
      return result.toJSON();
    })
    .then((resultData) => {
      console.log('data', resultData[0].languages);
      let languages = resultData[0].languages;
      let target;
      languages.forEach((language) => {
        if (language.primary == true && language.language_type == 'target') {
          target = language.languages.english_name;
          console.log('target', target);
        }
      });
      new Deck()
        .where({ id: req.params.id })
        .fetchAll({ withRelated: [`decks_cards.users_cards.cards.words.${target}_translations`] })
        .then((result) => {
          return res.send(result.toJSON());
        })
        .catch((err) => {
          console.log('error', err);
        });
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
