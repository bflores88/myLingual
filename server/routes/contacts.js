'use strict';

const express = require('express');
const router = express.Router();
const Contact = require('../database/models/Contact');

const knex = require('../database/knex.js');

// get user's accepted contacts
router.route('/').get((req, res) => {
  Contact.query({
    where: { requester: req.user.id, accepted: true },
    orWhere: { invitee: req.user.id, accepted: true },
  })
    .fetchAll({ withRelated: ['requesters', 'invitees'] })
    .then((result) => {
      // reply with all of the user's accepted contacts
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
      return res.status(500).send('Server error');
    });
});

router
  .route('/invites')
  .get((req, res) => {
    Contact.where({ invitee: req.user.id, responded: false })
      .fetchAll({ withRelated: ['requesters', 'invitees'] })
      .then((result) => {
        // reply with all of the user's open invitations
        return res.json(result);
      })
      .catch((err) => {
        console.log('error', err);
        return res.status(500).send('Server error');
      });
  })
  // send an invite
  .post((req, res) => {
    // TO ADD: error checking to ensure invitation is valid
    new Contact()
      .save({
        requester: req.user.id,
        invitee: req.body.invitee,
        accepted: false,
        responded: false,
      })
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.log('error', err);
        return res.status(500).send('Server error');
      });
  });

// respond to open invitations
router.route('/invites/:id').put((req, res) => {
  new Contact('id', req.params.id)
    .save({
      accepted: req.body.accepted,
      responded: true,
    })
    .then((result) => {
      // TO ADD: if accepted, respond with new contact info
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
