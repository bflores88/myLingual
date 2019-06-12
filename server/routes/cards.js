'use strict';

const express = require('express');
const router = express.Router();
const Card = require('../database/models/Card');
const Word = require('../database/models/Word');
const knex = require('../database/knex');

router
  .route('/')
  // fetches all cards
  .get((req, res) => {
    new Card()
      .fetchAll({ withRelated: ['users', 'words', 'card_themes', 'created_by'] })
      .then((results) => {
        return res.json(results.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

router.route('/:id').get((req, res) => {
  new Card('id', req.params.id)
    .fetch({ withRelated: ['words.spanish_translations', 'words.italian_translations', 'card_themes', 'users.tags'] })
    .then((result) => {
      const newResult = result.toJSON();
      newResult.english_word = newResult.words.english_word;
      newResult.spanish_translations = newResult.words.spanish_translations.spanish_word;
      newResult.italian_translations = newResult.words.italian_translations.italian_word;
      newResult.card_theme = newResult.card_themes.name;
      delete newResult.card_themes
      delete newResult.words;
    return res.json(newResult)
    })
    .catch((err) => {
      console.log('error', err);
    });
})

router.route('/search/:term').get((req, res) => {
  let search = req.params.term;
  let lowerSearch = search.toLowerCase();

  knex('words')
    .where(knex.raw('LOWER("english_word") LIKE ?', [`%${lowerSearch}%`]))
    .then((result) => {
      // check length to verify word exists
      if (!result.length) {
        return res.send('A flashcard has not been generated for this word.');
      }

      return new Word('english_word', result[0].english_word)
        .fetch({
          withRelated: ['spanish_translations', 'italian_translations', 'cards'],
        })
        .then((result) => {
          const resultJSON = result.toJSON();
          const spanish_translations = resultJSON.spanish_translations.spanish_word;
          const italian_translations = resultJSON.italian_translations.italian_word;

          // pass translations to cards
          const updateCards = resultJSON.cards.map((card) => {
            card.spanish_translations = spanish_translations;
            card.italian_translations = italian_translations;
            card.english_word = resultJSON.english_word;
            return card;
          })

          // only send back approved, active, and public cards
          const filterUpdateCards = updateCards.filter((card) => {
            return card.approved && card.active && card.public;
          })

          const newResult = {
            english_word: resultJSON.english_word,
            cards: filterUpdateCards
          }

          res.json(newResult);
        })
        .catch((err) => {
          console.log('error', err)
        });
    });
});

module.exports = router;
