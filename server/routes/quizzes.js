'use strict';

const express = require('express');
const router = express.Router();
const Deck = require('../database/models/Deck');
const Reply = require('../database/models/Reply');
const Quiz = require('../database/models/Quiz');
const QuizContent = require('../database/models/QuizContent');
// get specific quiz

router.route('/:id').get((req, res) => {
  new Quiz()
    .where({ id: req.params.id })
    .fetchAll({
      withRelated: [
        'quiz_contents.users_cards.cards.words.spanish_translations',
        'quiz_contents.users_cards.cards.words.italian_translations',
        'quiz_contents.users_cards.cards.words.japanese_translations',
      ],
    })
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// post reply
router.route('/:id').post((req, res) => {
  new Quiz({
    deck_id: parseInt(req.params.id),
    quiz_type: req.body.type,
  })
    .save()
    .then((result) => {
      return result;
    })
    .then((quiz) => {
      let newQuizId = quiz.attributes.id;
      let deck_id = quiz.attributes.deck_id;
      new Deck()
        .where({ id: deck_id })
        .fetchAll({ withRelated: ['decks_cards.users_cards.cards.words.spanish_translations'] })
        .then((result) => {
          let arrayUserCards = result.models[0].relations.decks_cards.models;
          let arrayCardId = [];

          arrayUserCards.forEach((element) => {
            arrayCardId.push(element.relations.users_cards.attributes.id);
          });

          arrayCardId.forEach((card) => {
            new QuizContent({
              users_cards_id: card,
              quiz_id: newQuizId,
              attempts: 0,
              successes: 0,
            }).save();
            // .then((result) => {
            //   return res.json(result);
            // })
            // .catch((err) => {
            //   console.log('error', err);
            // });
          });
          return newQuizId;
        })
        .then((quizId) => {
          return res.json(quizId);
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
