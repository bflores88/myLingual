'use strict';

const express = require('express');
const router = express.Router();
const ForumTopic = require('../database/models/ForumTopic');
const Post = require('../database/models/Post');
const Reply = require('../database/models/Reply');
const authGuard = require('../guards/authGuard');

// get specific post

router.route('/:id').get(authGuard, (req, res) => {
  new Post()
    .where({ id: req.params.id })
    .fetchAll({ withRelated: ['replies.created_by', 'created_by'] })
    .then((result) => {
      'forums/${}';
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});
// post reply
router.route('/:id').post(authGuard, (req, res) => {
  console.log(req.body);
  new Reply({
    post_id: req.params.id,
    sent_by: req.user.id,
    body: req.body.body,
  })
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
