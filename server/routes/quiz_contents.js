'use strict';

const express = require('express');
const router = express.Router();

const Reply = require('../database/models/Reply');
const Quiz = require('../database/models/Quiz');
const QuizContent = require('../database/models/QuizContent');
const authGuard = require('../guards/authGuard');
const isAdminGuard = require('../guards/adminGuard');

// get specific post

router.route('/:id').get(authGuard, (req, res) => {
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
// edit quiz question
router.route('/:id').put(authGuard, isAdminGuard, (req, res) => {
  console.log(req.body);
  new QuizContent('id', req.params.id)
    .save({
      attempts: req.body.attempts,
      successes: req.body.successes,
    })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
