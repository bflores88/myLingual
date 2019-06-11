'use strict';

const express = require('express');
const router = express.Router();
const ForumTopic = require('../database/models/ForumTopic');

router.route('/').get((req, res) => {
  new ForumTopic()
    .fetchAll({ withRelated: ['posts'] })
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
