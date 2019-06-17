'use strict';

module.exports = function(req, res, next) {
  if ([1, 2].includes(req.user.role_id)) {
    return next();
  } else {
    return res.send('Not authorized');
  }
};
