'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../services/image-upload');
const authGuard = require('../guards/authGuard');
// const Card = require('../database/models/Card');
// const Word = require('../database/models/Word');
// const UserCard = require('../database/models/UserCard');
// const knex = require('../database/knex');
// const singleUpload = upload.single('image');
// const aws = require('aws-sdk');
// const visionApi = require('../services/vision-api');
// const translateApi = require('../services/translate-api');

router.route('/').get(authGuard, (req, res) => {
  console.log('you have hit the google route', req.user);
  return res.send(req.user);
});

module.exports = router;
