const express = require('express');
const router = express.Router();
const DeckCard = require('../database/models/DeckCard');
const Deck = require('../database/models/Deck');

router.route('/').post((req, res) => {
  if (req.body.new_deck_name) {
    new Deck()
      .save({
        user_id: req.user.id,
        name: req.body.new_deck_name,
      })
      .then((result) => {
        const deckResult = result.toJSON();

        return new DeckCard().save({
          users_cards_id: req.body.usercard_id,
          deck_id: deckResult.id,
          card_theme_id: 1,
        });
      })
      .then((result) => {
        console.log('new deck card created', result);
      })
      .catch((err) => {
        console.log('error', err);
      });
  } else {
    // adds new card to deck
    new DeckCard()
      .save({
        users_cards_id: req.body.usercard_id,
        deck_id: req.body.deck_id,
        card_theme_id: 1,
      })
      .then((result) => {
        console.log('new deck card created', result);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
});

module.exports = router;