'use strict';

const Contact = require('../database/models/Contact');

module.exports = function(req, res, next) {
  Contact.where({ id: req.params.id })
    .fetch()
    .then((result) => {
      const invitee = result ? result.toJSON().invitee : null;
      const responded = result ? result.toJSON().responded : null;
      // user is the invitee on an unresponded invite
      if (invitee === req.user.id && !responded) {
        return next();
      } else {
        return res.send('Not authorized');
      }
    });
};
