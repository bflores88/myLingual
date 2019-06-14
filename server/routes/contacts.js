'use strict';

const express = require('express');
const router = express.Router();
const Contact = require('../database/models/Contact');

// router.route('/').get((req, res) => {
//   new Contact()
//     .where({ requester: req.user.id })
//     .orWhere({ invitee: req.user.id })
//     .andWhere({ accepted: true })
//     .fetchAll({ withRelated: ['requesters', 'invitees'] })
//     .then((result) => {
//       return res.send(result.toJSON());
//     })
//     .catch((err) => {
//       console.log('error', err);
//     });
// });

router.route('/').get((req, res) => {
  new Contact()
    .query({
      where: { requester: req.user.id },
      andWhere: { accepted: true },
      orWhere: { invitee: req.user.id },
      andWhere: { accepted: true },
    })

    .fetchAll({ withRelated: ['invitees', 'requesters'] })
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
