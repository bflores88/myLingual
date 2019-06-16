'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../database/knex.js');

router.route('/all/:search_text').get((req, res) => {
  const my_id = req.user ? req.user.id : 0;
  const my_username = req.user ? req.user.username : '';
  const search_text = req.params.search_text.toLowerCase();
  // still need to filter out private, unapproved cards
  knex
    .raw(
      `SELECT
        cards.id AS match_id,
        words.english_word AS match_name,
        word_similarity(?, words.english_word) AS match_score,
        cards.image_link AS match_image,
        (SELECT COUNT(*) FROM users_cards uc WHERE uc.card_id = cards.id AND uc.user_id = ?) AS match_own,
        'card' AS match_type
      FROM cards
      INNER JOIN words ON words.id = cards.word_id
      WHERE cards.word_id IN
        (SELECT id AS word_id
        FROM words
        WHERE
          char_length(?) > 1 AND
          (LOWER(english_word) LIKE ? OR ? % LOWER(english_word)))
      UNION
      SELECT
        users.id AS match_id,
        users.username AS match_name,
        word_similarity(?, users.username) AS match_score,
        users.profile_image_url AS match_image,
        (SELECT COUNT(*)
        FROM contacts c
        WHERE
          (c.requester = users.id AND c.invitee = ? AND c.accepted IS TRUE) OR
          (c.requester = ? AND c.invitee = users.id AND c.accepted IS TRUE)) AS match_own,
        'user' AS match_type
      FROM users
      WHERE users.username != ? AND users.username IN
        (SELECT username
        FROM users
        WHERE
          char_length(?) > 1 AND
          (LOWER(username) LIKE ? OR ? % LOWER(username)))`,
      [
        search_text,
        my_id,
        search_text,
        `%${search_text}%`,
        search_text,
        search_text,
        my_id,
        my_id,
        my_username,
        search_text,
        `%${search_text}%`,
        search_text,
      ],
    )
    .then((result) => {
      return res.json(result.rows);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
});

router.route('/cards/:search_text').get((req, res) => {
  const my_id = req.user ? req.user.id : 0;
  const search_text = req.params.search_text.toLowerCase();
  // still need to filter out private, unapproved cards
  knex
    .raw(
      `SELECT
        cards.id AS match_id,
        words.english_word AS match_name,
        word_similarity(?, words.english_word) AS match_score,
        cards.image_link AS match_image,
        (SELECT COUNT(*) FROM users_cards uc WHERE uc.card_id = cards.id AND uc.user_id = ?) AS match_own,
        'card' AS match_type
      FROM cards
      INNER JOIN words ON words.id = cards.word_id
      WHERE cards.word_id IN
        (SELECT id AS word_id
        FROM words
        WHERE
          char_length(?) > 1 AND
          (LOWER(english_word) LIKE ? OR ? % LOWER(english_word)))`,
      [search_text, my_id, search_text, `%${search_text}%`, search_text],
    )
    .then((result) => {
      return res.json(result.rows);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
});

router.route('/users/:search_text').get((req, res) => {
  const my_id = req.user ? req.user.id : 0;
  const my_username = req.user ? req.user.username : '';
  const search_text = req.params.search_text.toLowerCase();
  // still need to filter out users with private profile
  knex
    .raw(
      `SELECT
        users.id AS match_id,
        users.username AS match_name,
        word_similarity(?, users.username) AS match_score,
        users.profile_image_url AS match_image,
        (SELECT COUNT(*)
        FROM contacts c
        WHERE
          (c.requester = users.id AND c.invitee = ? AND c.accepted IS TRUE) OR
          (c.requester = ? AND c.invitee = users.id AND c.accepted IS TRUE)) AS match_own,
        'user' AS match_type
      FROM users
      WHERE users.username != ? AND users.username IN
        (SELECT username
        FROM users
        WHERE
          char_length(?) > 1 AND
          (LOWER(username) LIKE ? OR ? % LOWER(username)))`,
      [search_text, my_id, my_id, my_username, search_text, `%${search_text}%`, search_text],
    )
    .then((result) => {
      return res.json(result.rows);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
