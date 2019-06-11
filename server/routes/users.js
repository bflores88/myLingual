'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const UserCard = require('../database/models/UserCard');
const Deck = require('../database/models/Deck');

router
  .route('/')
  // fetches all users
  .get((req, res) => {
    new User()
      .fetchAll({ withRelated: ['roles'] })
      .then((result) => {
        return res.send(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

router.route('/:id').get((req, res) => {
  new User('id', req.params.id)
    .fetch({ withRelated: ['roles', 'cards', 'decks', 'languages'] })
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// fetches all cards owned by User
router.route('/:id/cards').get((req, res) => {
  new User('id', req.params.id)
    .fetch({
      withRelated: [
        'cards.cards.words.spanish_translations',
        'cards.cards.words.italian_translations',
        'cards.cards.card_themes',
        'cards.cards.created_by',
        'roles',
        {
          'languages.languages': function(qb) {
            qb.columns('id', 'english_name', 'native_name');
          },
        },
      ],
      columns: ['id', 'role_id', 'name', 'username', 'email', 'profile_image_url'],
    })
    .then((result) => {
      const newResult = assembleUserCards(result.toJSON());
      return res.send(newResult);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// fetches all decks belonging to User 
router.route('/:id/decks')
  .get((req, res) => {
    Deck.where({ user_id: req.params.id })
      .fetchAll({ withRelated: ['decks_cards']})
      .then((result) => {
      res.send(result.toJSON())
      })
      .catch((err) => {
        console.log('error', err);
      });
})

function assembleUserCards(result) {
  const data = {
    id: result.id,
    role_id: result.role_id,
    role: result.roles.name,
    name: result.name,
    username: result.username,
    profile_image_url: result.profile_image_url
  };

  let native_languages = [];
  let target_languages = [];

  // assemble languages
  result.languages.forEach((language) => {
    if (language.language_type === 'native') {
      native_languages.push(language.languages.english_name)
    } else {
      target_languages.push(language.languages.english_name)
    }
  })

  data.native_languages = native_languages;
  data.target_languages = target_languages;

  // assemble cards
  const UserCards = result.cards.map((card, key) => {
    return {
      card_id: card.card_id,
      attempts: card.attempts,
      successes: card.successes,
      created_by: card.cards.created_by.username,
      created_by_id: card.cards.created_by.id,
      likes: card.cards.likes,
      shares: card.cards.shares,
      red_flagged: card.cards.red_flagged,
      downloads: card.cards.downloads,
      image_link: card.cards.image_link,
      approved: card.cards.approved,
      public: card.cards.public,
      active: card.cards.active,
      english_word: card.cards.words.english_word,
      spanish_translations: card.cards.words.spanish_translations.spanish_word,
      italian_translations: card.cards.words.italian_translations.italian_word,
      card_themes: card.cards.card_themes.name
    }
  })

  data.UserCards = UserCards;

  return data;
}

module.exports = router;
