'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const UserCard = require('../database/models/UserCard');
const Deck = require('../database/models/Deck');
const authGuard = require('../guards/authGuard');
const isOwnerGuard = require('../guards/isOwnerGuard');

router
  .route('/')
  // fetches all users
  .get(authGuard, (req, res) => {
    new User()
      .fetchAll({ withRelated: ['roles'] })
      .then((result) => {
        return res.send(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

router
  .route('/:id')
  .get(authGuard, (req, res) => {
    // returns a specific user by id
    new User('id', req.params.id)
      .where({ active: true })
      .fetch({ withRelated: ['roles', 'cards', 'created_cards', 'decks', 'languages.languages'] })
      .then((result) => {
        const newResult = assembleUserData(result.toJSON());
        return res.json(newResult);
      })
      .catch((err) => {
        console.log('error', err);
      });
  })
  .put(authGuard, (req, res) => {
    User.where('id', req.user.id)
      .save({
        active: req.body.active,
        role_id: req.body.role_id,
        name: req.body.name,
        email: req.body.email,
      })
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

// fetches all cards owned by User
router.route('/:id/cards').get(authGuard, (req, res) => {
  UserCard.where('user_id', req.params.id)
    .fetchAll({
      withRelated: [
        'cards.words',
      ],
    })
    .then((result) => {
      // const newResult = assembleUserCards(result.toJSON());
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// fetches all decks belonging to User
router.route('/:id/decks').get(authGuard, (req, res) => {
  Deck.where({ user_id: req.params.id })
    .fetchAll({
      withRelated: [
        'decks_cards.users_cards.cards.words.spanish_translations',
        'decks_cards.users_cards.cards.words.italian_translations',
        'decks_cards.users_cards.cards.created_by',
        'decks_cards.users_cards.cards.card_themes',
        'users.languages.languages',
      ],
    })
    .then((result) => {
      const newResult = assembleUserDecks(result.toJSON());
      return res.json(newResult);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

function assembleUserData(result) {
  const data = {
    id: result.id,
    active: result.active,
    role_id: result.role_id,
    role: result.roles.name,
    username: result.username,
    name: result.name,
    email: result.email,
    profile_image_url: result.profile_image_url,
    created_at: result.created_at,
    cards_owned: result.cards.length,
    cards_created: result.created_cards.length,
    decks: result.decks.length,
  };

  // assemble languages
  let native_languages = [];
  let target_languages = [];
  result.languages.forEach((language) => {
    if (language.language_type === 'native') {
      native_languages.push(language.languages.english_name);
    } else {
      target_languages.push(language.languages.english_name);
    }
  });

  data.native_languages = native_languages;
  data.target_languages = target_languages;

  return data;
}

function assembleUserDecks(result) {
  const data = {};

  let UserDecks = [];

  result.forEach((deck, idx) => {
    const thisDeck = {
      id: deck.id,
      users_cards_id: deck.users_cards_id,
      created_at: deck.created_at,
      updated_at: deck.updated_at,
      name: deck.name,
    };

    // assemble cards in deck
    const deckCards = deck.decks_cards.map((card) => {
      const deck_card = {
        id: card.id,
        deck_id: card.deck_id,
        attempts: card.users_cards.attempts,
        successes: card.users_cards.successes,
        likes: card.users_cards.cards.likes,
        shares: card.users_cards.cards.shares,
        red_flagged: card.users_cards.cards.red_flagged,
        downloads: card.users_cards.cards.downloads,
        image_link: card.users_cards.cards.image_link,
        approved: card.users_cards.cards.approved,
        public: card.users_cards.cards.public,
        active: card.users_cards.cards.active,
        english_word: card.users_cards.cards.words.english_word,
        spanish_translations: card.users_cards.cards.words.spanish_translations.spanish_word,
        italian_translations: card.users_cards.cards.words.italian_translations.italian_word,
        card_theme_id: card.users_cards.cards.card_themes.id,
        card_theme: card.users_cards.cards.card_themes.name,
      };
      return deck_card;
    });

    thisDeck.deckCards = deckCards;

    UserDecks.push(thisDeck);
  });

  return UserDecks;
}

module.exports = router;
