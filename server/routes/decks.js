'use strict';

const express = require('express');
const router = express.Router();
const Deck = require('../database/models/Deck');

router.route('/')
  .get((req, res) => {
    new Deck()
      .fetchAll({ withRelated: ['users', 'decks_cards.users_cards'] })
      .then((result) => {
      return res.json(result.toJSON())
      })
      .catch((err) => {
      console.log('error', err)
    })
  })

module.exports = router;