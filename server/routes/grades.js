'use strict';

const express = require('express');
const router = express.Router();
const Quiz = require('../database/models/Quiz');
const Deck = require('../database/models/Deck');
const authGuard = require('../guards/authGuard');

// get all quizzes for user
router.route('/').get(authGuard, (req, res) => {
  new Deck()
    .where({ user_id: req.user.id })
    .fetchAll({ withRelated: ['quizzes.quiz_contents'] })
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// get specific post

router.route('/:post_id').get(authGuard, (req, res) => {
  new ForumTopic()
    .where({ id: req.params.post_id })
    .fetchAll({ withRelated: ['posts.created_by'] })
    .then((result) => {
      console.log('test');
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// add new post to specific forum

router.route('/:id').post(authGuard, (req, res) => {
  // console.log(req.body);
  new Post({
    forum_topic_id: req.params.id,
    // created_by: req.body.created_by,
    created_by: req.user.id,
    body: req.body.body,
    title: req.body.title,
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
