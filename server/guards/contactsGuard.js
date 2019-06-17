'use strict';

const Contact = require('../database/models/Contact');

module.exports = function(req, res, next) {
  Contact.where({ id: req.params.id })
    .fetch()
    .then((result) => {
      const requester = result ? result.toJSON().requester : null;
      const invitee = result ? result.toJSON().invitee : null;
      const accepted = result ? result.toJSON().accepted : null;
      // user is requester or invitee on an accepted request
      if ([requester, invitee].includes(req.user.id) && accepted) {
        return next();
      } else {
        return res.send('Not authorized');
      }
    });
};
