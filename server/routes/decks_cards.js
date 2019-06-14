const express = require('express');
const router = express.Router();
const DeckCard = require('../database/models/DeckCard');

router.route('/')
  .post((req, res) => {
  
    // adds new card to deck
    new DeckCard()
      .save({
      users_cards_id: 1
    })
})