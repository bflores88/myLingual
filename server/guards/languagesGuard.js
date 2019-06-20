'use strict';

const UserLanguage = require('../database/models/UserLanguage');

module.exports = function(req, res, next) {
  UserLanguage.where({ id: req.params.id, active: true })
    .fetch()
    .then((result) => {
      const languageUserId = result ? result.toJSON().user_id : null;

      if (languageUserId === parseInt(req.user.id)) {
        return next();
      } else {
        return res.send('Not authorized');
      }
    });
};
