'use strict';

const express = require('express');
const router = express.Router();
const Conversation = require('../database/models/Conversation');
const Message = require('../database/models/Message');

const knex = require('../database/knex.js');

router.route('/').get((req, res) => {
  knex
    .raw(
      `SELECT
        c_lm_list.id,
        c_lm_list.user_list,
        c_lm_list.max_message_id,
        messages.created_at AS last_message_ts,
        messages.body AS last_message
      FROM
        (SELECT
          c_list.id,
          c_list.user_list,
          MAX(messages.id) AS max_message_id
        FROM
          (SELECT conversations.id, string_agg(users.username, ', ') AS user_list
          FROM conversations
          INNER JOIN users_conversations uc ON uc.conversation_id = conversations.id
          INNER JOIN users ON users.id = uc.user_id
          WHERE conversations.id IN
            (SELECT conversations.id
            FROM conversations
            INNER JOIN users_conversations uc ON uc.conversation_id = conversations.id
            WHERE uc.user_id = ?)
          GROUP BY conversations.id) c_list
        INNER JOIN messages ON messages.conversation_id = c_list.id
        GROUP BY c_list.id, c_list.user_list) c_lm_list
      INNER JOIN messages ON messages.id = c_lm_list.max_message_id
      ORDER BY c_lm_list.max_message_id DESC`,
      [1],
    )
    .then((result) => {
      return res.json(result.rows);
    })
    .catch((err) => {
      console.log('error', err);
      return res.status(500).send('Server Error');
    });
});

router
  .route('/:conversation_id')
  .get((req, res) => {
    knex
      .raw(
        `SELECT
          messages.id AS message_id,
          messages.sent_by AS sent_by_user_id,
          users.username AS sent_by_username,
          messages.body,
          messages.conversation_id,
          messages.created_at
        FROM messages
        INNER JOIN users ON users.id = messages.sent_by
        INNER JOIN users_conversations uc ON uc.conversation_id = messages.conversation_id
        WHERE uc.user_id = ? AND messages.conversation_id = ?
        ORDER BY message_id`,
        [1, req.params.conversation_id],
      )
      .then((result) => {
        return res.json(result.rows);
      })
      .catch((err) => {
        console.log('error', err);
        return res.status(500).send('Server Error');
      });
  })
  .post((req, res) => {
    new Message()
      .save({
        body: req.body.body,
        conversation_id: parseInt(req.params.conversation_id),
        sent_by: parseInt(1),
      })
      .then(() => {
        return knex.raw(
          `SELECT
            messages.id AS message_id,
            messages.sent_by AS sent_by_user_id,
            users.username AS sent_by_username,
            messages.body,
            messages.conversation_id,
            messages.created_at
          FROM messages
          INNER JOIN users ON users.id = messages.sent_by
          INNER JOIN users_conversations uc ON uc.conversation_id = messages.conversation_id
          WHERE uc.user_id = ? AND messages.conversation_id = ?
          ORDER BY message_id`,
          [1, req.params.conversation_id],
        );
      })
      .then((result) => {
        return res.json(result.rows);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(500).send('Server error');
      });
  });

module.exports = router;
