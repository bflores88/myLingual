'use strict';

const express = require('express');
const router = express.Router();
const ForumTopic = require('../database/models/ForumTopic');
const Post = require('../database/models/Post');

// get specific post

router.route('/:id').get((req, res) => {
  new Post()
    .where({ id: req.params.id })
    .fetchAll({ withRelated: ['replies'] })
    .then((result) => {
      'forums/${}';
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
