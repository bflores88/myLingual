'use strict';

const express = require('express');
const router = express.Router();
const Deck = require('../database/models/Deck');

// router.route('/')
//   .get((req, res) => {
//     new Deck()
//       .fetchAll({ withRelated: ['users', 'decks_cards.users_cards'] })
//       .then((result) => {
//       return res.send(result.toJSON())
//       })
//       .catch((err) => {
//       console.log('error', err)
//     })
//   })

router.route('/').get((req, res) => {
  console.log(req.user);
  new Deck()
    .where({ user_id: req.user.id })
    .fetchAll()
    .then((result) => {
      'forums/${}';
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// post new deck

router.route('/').post((req, res) => {
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

module.exports = router;
