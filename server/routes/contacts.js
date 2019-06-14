'use strict';

const express = require('express');
const router = express.Router();
const Contact = require('../database/models/Contact');

const knex = require('../database/knex.js');

// get a user's accepted contacts
router.route('/').get((req, res) => {
  Contact.query({
    where: { requester: req.user.id, accepted: true },
    orWhere: { invitee: req.user.id, accepted: true },
  })
    .fetchAll({ withRelated: ['requesters', 'invitees'] })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
      return res.status(500).send('Server error');
    });
});

// get a user's invites
router.route('/invites').get((req, res) => {
  Contact.where({ invitee: req.user.id, responded: false })
    .fetchAll({ withRelated: ['requesters', 'invitees'] })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
