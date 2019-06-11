'use strict';

const express = require('express');
const router = express.Router();
const Conversation = require('../database/models/Conversation');

router
  .route('/')
  // fetches all cards
  .get((req, res) => {
    new Conversation()
      .fetchAll({ withRelated: ['users.conversations', 'messages'] })
      .then((result) => {
        console.log(result);
        return res.json(result);
      })
      .catch((err) => {
        console.log('error', err);
        return res.status(500).send('Server Error');
      });
  });

module.exports = router;
