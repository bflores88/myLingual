'use strict';

const express = require('express');
const router = express.Router();
const ForumTopic = require('../database/models/ForumTopic');
const Post = require('../database/models/Post');

// get all forums
router.route('/').get((req, res) => {
  new ForumTopic()
    .fetchAll({ withRelated: ['posts'] })
    .then((result) => {
      'forums/${}';
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// get specific forum

router.route('/:id').get((req, res) => {
  new ForumTopic()
    .where({ id: req.params.id })
    .fetchAll({ withRelated: ['posts'] })
    .then((result) => {
      'forums/${}';
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
