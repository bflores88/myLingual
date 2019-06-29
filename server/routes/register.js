'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User.js');
const bcrypt = require('bcryptjs');

const saltRounds = 12;

router.post('/', (req, res) => {
  console.log(req.body);
  console.log('hits register route backend');
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return 500;
    }

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        return 500;
      }
      return new User({
        active: true,
        private_mode: false,
        role_id: 3,
        username: req.body.username,
        password: hash,
        name: req.body.username,
        email: '',
        profile_image_url:
          'https://www.loginradius.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
        lingots: 0,
      })
        .save()
        .then(() => {
          return res.send({ status: 'ok' });
        })
        .catch((err) => {
          return res.send('Error Creating Account');
        });
    });
  });
});

module.exports = router;
