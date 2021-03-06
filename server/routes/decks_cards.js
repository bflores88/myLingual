const express = require('express');
const router = express.Router();
const DeckCard = require('../database/models/DeckCard');
const Deck = require('../database/models/Deck');
const authGuard = require('../guards/authGuard');

router
  .route('/')
  .post(authGuard, (req, res) => {
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
      if (req.body.new_decks_cards) {
        console.log('******', req.body.new_decks_cards);
        const newDecksCards = req.body.new_decks_cards.map((card) => {
          return {
            users_cards_id: card,
            deck_id: parseInt(req.body.deck_id),
            card_theme_id: 1,
          };
        });

        DeckCard.collection(newDecksCards).invokeThen('save');

        return res.json(newDecksCards);
      } else {
        new DeckCard()
          .save({
            users_cards_id: req.body.usercard_id,
            deck_id: req.body.deck_id,
            card_theme_id: 1,
          })
          .then(() => {
            return res.json({message: "Card Added to Deck"});
          })
          .catch(() => {
            return res.json({errorMessage: "Error adding card to Deck"});
          });
      }
    }
  })
  .put(authGuard, (req, res) => {
    console.log(req.body)
    new DeckCard({
      users_cards_id: req.body.delete_card,
      deck_id: req.body.deck_id
    })
      .fetch()
      .then((results) => {
        console.log(results.toJSON());
        const toJSON = results.toJSON();
        const id = toJSON.id;
        return new DeckCard({ id: id })
        .destroy()
      })
      .then(() => {
        return res.json({ delete_success: `successfully deleted card` });
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

module.exports = router;
