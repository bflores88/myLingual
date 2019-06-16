'use strict';

const express = require('express');
const router = express.Router();
const Deck = require('../database/models/Deck');
const Language = require('../database/models/Language');

const UserLanguage = require('../database/models/UserLanguage');

router.route('/all').get((req, res) => {
  new Language()
    .fetchAll({})
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// change user target language

router.route('/target').put((req, res) => {
  UserLanguage.query({
    where: { user_id: req.user.id, language_type: 'target' },
  })
    .destroy()
    .then(() => {
      new UserLanguage()
        .save({
          user_id: req.user.id,
          language_id: req.body.language_id,
          language_type: 'target',
        })
        .then((result) => {
          return res.json(result);
        })
        .catch((err) => {
          console.log('error', err);
          return res.status(500).send('Server error');
        });
    })
    .catch((err) => {
      console.log('error', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
