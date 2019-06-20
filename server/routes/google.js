'use strict';

const express = require('express');
const router = express.Router();
const Card = require('../database/models/Card');
const Word = require('../database/models/Word');
const UserCard = require('../database/models/UserCard');
const knex = require('../database/knex');
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');
const aws = require('aws-sdk');
const visionApi = require('../services/vision-api');
const translateApi = require('../services/translate-api');

router.route('/').get((req, res) => {
  console.log('you have hit the google route', req.user);
  return res.send(req.user);
});

module.exports = router;
