'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../services/image-upload');
const authGuard = require('../guards/authGuard');

router.route('/').get(authGuard, (req, res) => {
  console.log('you have hit the google route', req.user);
  return res.send(req.user);
});

module.exports = router;
