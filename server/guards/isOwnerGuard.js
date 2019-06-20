'use strict';

const User = require('../database/models/User');

module.exports = function() {
  User.where({ id: req.params.id, active: true })
    .fetch()
    .then((result) => {
      const userId = result ? result.toJSON().user_id : null;

      if (userId === parseInt(req.user.id)) {
          return next()
      } else {
          return res.send('Not authorized');
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
};
