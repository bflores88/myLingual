'use strict';

const Contact = require('../database/models/Contact');

module.exports = function(req, res, next) {
  Contact.where({ id: req.params.id })
    .fetch()
    .then((result) => {
      const requester = result ? result.toJSON().requester : null;
      const responded = result ? result.toJSON().responded : null;
      // user is the requester on an unresponded invite
      if (requester === req.user.id && !responded) {
        return next();
      } else {
        return res.send('Not authorized');
      }
    });
};
