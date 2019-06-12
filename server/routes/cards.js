'use strict';

const express = require('express');
const router = express.Router();
const Card = require('../database/models/Card');

router
  .route('/')
  // fetches all cards
  .get((req, res) => {
    new Card()
      .fetchAll({ withRelated: ['users', 'words', 'card_themes', 'created_by'] })
      .then((results) => {
        return res.send(results.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

router
  .route('/:id')
  // fetches all cards
  .get((req, res) => {
    new Card('id', req.params.id)
      .fetch({
        withRelated: ['users', 'words.italian_translations', 'words.spanish_translations', 'card_themes', 'created_by']
      })
      .then((results) => {
        return res.send(results.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  })


module.exports = router;
