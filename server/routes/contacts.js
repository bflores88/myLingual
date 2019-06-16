'use strict';

const express = require('express');
const router = express.Router();
const Contact = require('../database/models/Contact');
const authGuard = require('../guards/authGuard');
const invitesGuard = require('../guards/invitesGuard');
const requestsGuard = require('../guards/requestsGuard');
const contactsGuard = require('../guards/contactsGuard');

// get user's accepted contacts
router.route('/').get(authGuard, (req, res) => {
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
  .get(authGuard, (req, res) => {
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
  .post(authGuard, (req, res) => {
    if (parseInt(req.body.invitee) === req.user.id) {
      console.log('Cannot send an invite to self');
      return res.send('Server error');
    }

    // fetch all contact records associated with user & invitee
    Contact.query({
      where: { requester: req.user.id, invitee: req.body.invitee },
      orWhere: { requester: req.body.invitee, invitee: req.user.id },
    })
      .fetchAll()
      .then((result) => {
        let invalidInvite = false;
        // validate there are no accepted or outstanding invites
        if (result.length > 0) {
          result.toJSON().forEach((contact) => {
            if (contact.accepted || !contact.responded) {
              invalidInvite = true;
            }
          });
        }

        if (invalidInvite) {
          throw new Error('Invalid invite.');
        }

        // send an invite
        return new Contact().save({
          requester: req.user.id,
          invitee: req.body.invitee,
          accepted: false,
          responded: false,
        });
      })
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).send('Server error');
      });
  });

router
  .route('/invites/:id')
  .put(authGuard, invitesGuard, (req, res) => {
    // respond to invitation
    new Contact('id', req.params.id)
      .save({
        accepted: req.body.accepted,
        responded: true,
      })
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.log('error', err);
        return res.status(500).send('Server error');
      });
  })
  .delete(authGuard, requestsGuard, (req, res) => {
    // cancel invite
    Contact.where({ id: req.params.id })
      .destroy()
      .then(() => {
        return res.send('Successful delete');
      })
      .catch((err) => {
        console.log('error', err);
        return res.status(500).send('Server error');
      });
  });

router.route('/:id').delete(authGuard, contactsGuard, (req, res) => {
  // remove contact (swap accepted to false)
  new Contact('id', req.params.id)
    .save({
      accepted: false,
    })
    .then(() => {
      return res.send('Succesful removal');
    })
    .catch((err) => {
      console.log('error', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
