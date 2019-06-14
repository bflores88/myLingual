'use strict';

const express = require('express');
const router = express.Router();

const Reply = require('../database/models/Reply');
const Quiz = require('../database/models/Quiz');
const QuizContent = require('../database/models/QuizContent');
// get specific quiz

router.route('/:id').get((req, res) => {
  new Quiz()
    .where({ id: req.params.id })
    .fetchAll({ withRelated: ['quiz_contents.users_cards.cards.words.spanish_translations'] })
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// post reply
router.route('/:id').post((req, res) => {
  console.log(req.body);
  new Quiz({
    post_id: req.params.id,
    sent_by: req.body.sent_by,
    body: req.body.body,
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
