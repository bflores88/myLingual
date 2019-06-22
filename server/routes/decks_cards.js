const express = require('express');
const router = express.Router();
const DeckCard = require('../database/models/DeckCard');
const Deck = require('../database/models/Deck');
const authGuard = require('../guards/authGuard');

router.route('/').post(authGuard, (req, res) => {
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
    // adds card to existing deck
    new DeckCard({
      users_cards_id: req.body.usercard_id,
      deck_id: req.body.deck_id,
    })
    .fetch()
    .then((result) => {
      if (result) {
        return res.json('Card already in deck');
      } else {
        new DeckCard()
        .save({
          users_cards_id: req.body.usercard_id,
          deck_id: req.body.deck_id,
          card_theme_id: 1,
        })
        .then(() => {
          return res.json({message: "Card added to deck"});
        })
        .catch(() => {
          return res.json({
            errorMessage: "Error adding card to existing deck"
          });
        });
      }
    })
  }
});

module.exports = router;