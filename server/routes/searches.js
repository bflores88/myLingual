'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../database/knex.js');

router.route('/all/:search_text').get((req, res) => {
  const my_id = req.user ? req.user.id : 0;
  const my_username = req.user ? req.user.username : '';
  const search_text = req.params.search_text.toLowerCase();
  knex
    .raw(
      `SELECT
      cards.id AS match_id,
      words.english_word AS match_name,
      word_similarity(?, words.english_word) AS match_score,
      cards.image_link AS match_image,
      (SELECT COUNT(*) FROM users_cards uc WHERE uc.card_id = cards.id AND uc.user_id = ?) AS match_own,
      users.username AS match_other_text,
      users.profile_image_url AS match_other_image,
      'card' AS match_type
    FROM cards
    INNER JOIN words ON words.id = cards.word_id
    INNER JOIN users ON cards.created_by = users.id
    WHERE
      cards.approved IS TRUE AND
      cards.public IS TRUE AND
      cards.active IS TRUE AND
      cards.word_id IN
        (SELECT id AS word_id
        FROM words
        WHERE
          char_length(?) > 0 AND
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
        languages.native_name AS match_other_text,
        languages.flag_link AS match_other_image,
        'user' AS match_type
      FROM users
      INNER JOIN users_languages ul ON ul.user_id = users.id
      INNER JOIN languages ON languages.id = ul.language_id
      WHERE
        ul.language_type='target' AND ul.primary IS TRUE AND ul.active IS TRUE AND
        users.username != ? AND
        users.private_mode IS FALSE AND
        users.username IN
          (SELECT username
          FROM users
          WHERE
            char_length(?) > 0 AND
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
      // add sortScore key-value to sort matches
      let matchPerfect;
      let matchWeighted;
      let matchCard;
      result.rows.forEach((match) => {
        // postgres COUNT() returns string.  convert to number.
        match.match_own = parseInt(match.match_own);
        // sort1: exact match > (0, 100)
        matchPerfect = match.match_score === 1 ? 100 : 0;
        // sort2: match score (0-10) + priority if own card/contact (0, 2)
        matchWeighted = 10 * match.match_score + 2 * match.match_own;
        // sort3: match is a card > (0, 1)
        matchCard = match.match_type === 'card' ? 1 : 0;
        match.sortScore = matchPerfect + matchWeighted + matchCard;
      });
      // sort by sortScore; break ties by id
      result.rows.sort((a, b) => {
        if (a.sortScore === b.sortScore) {
          return a.match_id - b.match_id;
        }
        return b.sortScore - a.sortScore;
      });
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
  knex
    .raw(
      `SELECT
        cards.id AS match_id,
        words.english_word AS match_name,
        word_similarity(?, words.english_word) AS match_score,
        cards.image_link AS match_image,
        (SELECT COUNT(*) FROM users_cards uc WHERE uc.card_id = cards.id AND uc.user_id = ?) AS match_own,
        users.username AS match_other_text,
        users.profile_image_url AS match_other_image,
        'card' AS match_type
      FROM cards
      INNER JOIN words ON words.id = cards.word_id
      INNER JOIN users ON cards.created_by = users.id
      WHERE
        cards.approved IS TRUE AND
        cards.public IS TRUE AND
        cards.active IS TRUE AND
        cards.word_id IN
          (SELECT id AS word_id
          FROM words
          WHERE
            char_length(?) > 0 AND
            (LOWER(english_word) LIKE ? OR ? % LOWER(english_word)))`,
      [search_text, my_id, search_text, `%${search_text}%`, search_text],
    )
    .then((result) => {
      // add sortScore key-value to sort matches
      let matchPerfect;
      let matchWeighted;
      let matchCard;
      result.rows.forEach((match) => {
        // postgres COUNT() returns string.  convert to number.
        match.match_own = parseInt(match.match_own);
        // sort1: exact match > (0, 100)
        matchPerfect = match.match_score === 1 ? 100 : 0;
        // sort2: match score (0-10) + priority if own card/contact (0, 2)
        matchWeighted = 10 * match.match_score + 2 * match.match_own;
        // sort3: match is a card > (0, 1)
        matchCard = match.match_type === 'card' ? 1 : 0;
        match.sortScore = matchPerfect + matchWeighted + matchCard;
      });
      // sort by sortScore; break ties by id
      result.rows.sort((a, b) => {
        if (a.sortScore === b.sortScore) {
          return a.match_id - b.match_id;
        }
        return b.sortScore - a.sortScore;
      });
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
        languages.native_name AS match_other_text,
        languages.flag_link AS match_other_image,
        'user' AS match_type
      FROM users
      INNER JOIN users_languages ul ON ul.user_id = users.id
      INNER JOIN languages ON languages.id = ul.language_id
      WHERE
        ul.language_type='target' AND ul.primary IS TRUE AND ul.active IS TRUE AND
        users.username != ? AND
        users.private_mode IS FALSE AND
        users.username IN
          (SELECT username
          FROM users
          WHERE
            char_length(?) > 0 AND
            (LOWER(username) LIKE ? OR ? % LOWER(username)))`,
      [search_text, my_id, my_id, my_username, search_text, `%${search_text}%`, search_text],
    )
    .then((result) => {
      // add sortScore key-value to sort matches
      let matchPerfect;
      let matchWeighted;
      let matchCard;
      result.rows.forEach((match) => {
        // postgres COUNT() returns string.  convert to number.
        match.match_own = parseInt(match.match_own);
        // sort1: exact match > (0, 100)
        matchPerfect = match.match_score === 1 ? 100 : 0;
        // sort2: match score (0-10) + priority if own card/contact (0, 2)
        matchWeighted = 10 * match.match_score + 2 * match.match_own;
        // sort3: match is a card > (0, 1)
        matchCard = match.match_type === 'card' ? 1 : 0;
        match.sortScore = matchPerfect + matchWeighted + matchCard;
      });
      // sort by sortScore; break ties by id
      result.rows.sort((a, b) => {
        if (a.sortScore === b.sortScore) {
          return a.match_id - b.match_id;
        }
        return b.sortScore - a.sortScore;
      });
      return res.json(result.rows);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
