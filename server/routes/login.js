'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../database/models/User.js');

router.post('/', passport.authenticate('local'), (req, res) => {
  return new User({ username: req.body.username })
    .fetch({ columns: ['id'] })
    .then((response) => {
      return res.json(response.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
