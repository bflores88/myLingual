'use strict';

const express = require('express');
const router = express.Router();
const Conversation = require('../database/models/Conversation');
const UserConversation = require('../database/models/UserConversation');
const Message = require('../database/models/Message');
const authGuard = require('../guards/authGuard');

const knex = require('../database/knex.js');

router
  .route('/')
  .get(authGuard, (req, res) => {
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
        [req.user.id],
      )
      .then((result) => {
        return res.json(result.rows);
      })
      .catch((err) => {
        console.log('error', err);
        return res.status(500).send('Server Error');
      });
  })
  .post(authGuard, (req, res) => {
    // TO-DO: ensure req.body.userList is an array of user_id's
    // TO-DO: ensure that recipient list contains only a user's contacts
    // must send a message when starting a conversation

    if (!req.body.hasOwnProperty('body')) {
      console.log('Must provide a message when starting a conversation');
      return res.status(400).send('Bad request');
    }

    if (!req.body.hasOwnProperty('userList') || !Array.isArray(req.body.userList)) {
      // FYI: userList *can* be an empty array
      console.log('Must provide a userList (as an array) when starting a conversation');
      return res.status(400).send('Bad request');
    }

    let newConversation = false;

    // retrieve all conversations belonging to user
    UserConversation.where({ user_id: req.user.id })
      .fetchAll({ withRelated: ['conversations.users'] })
      .then((result) => {
        const spreadConversations = [];

        if (result.length === 0) {
          return spreadConversations;
        }
        const allConversations = result.toJSON();

        allConversations.forEach((conversation) => {
          const data = { conversation_id: conversation.conversation_id };
          const participants = [];

          conversation.conversations.users.forEach((user) => {
            if (user.user_id !== req.user.id) {
              participants.push(user.user_id);
            }
          });

          data.participants = participants;

          if (participants.length > 0) {
            spreadConversations.push(data);
          }
        });

        return spreadConversations;
      })
      .then((result) => {

        // check for pre-existing
        let existingConversation = { exists: false };

        if (result.length > 0) {
          result.forEach((conversation) => {
            if (conversation.participants.sort().toString() === req.body.userList.sort().toString()) {
              existingConversation.exists = true;
              existingConversation.id = conversation.conversation_id;
            }
          });
        }

        // if already a conversation between users in userLis
        // then return the existingConversation object
        if (existingConversation.exists) {
          return existingConversation.id;
          // otherwise create a new conversation
        } else {
          newConversation = true;
          return new Conversation().save({}).then((results) => {
            return results.id;
          });
        }
      })
      .then((result) => {
        return new Message().save({
          body: req.body.body,
          conversation_id: result,
          sent_by: req.user.id,
        });
      })
      .then((result) => {

        // for new conversations, tie to sender and participants
        if (newConversation) {
          // tie sender to the conversation
          const conversation_id = result.toJSON().conversation_id;
          const users_conversations = [
            {
              conversation_id,
              user_id: req.user.id,
            },
          ];
          // tie recipients to the conversation
          const userList = req.body.userList;
          if (userList.length > 0) {
            userList.forEach((user) => {
              users_conversations.push({
                conversation_id,
                user_id: parseInt(user),
              });
            });
          }

          // post to users_conversations (one entry per recipient)
          return UserConversation.collection(users_conversations).invokeThen('save');
        } else {
          return;
        }
      })
      .then(() => {
        newConversation = false;
        return res.json({ success: 'made new conversation' });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).send('Server error');
      });
  });

router
  .route('/:conversation_id')
  .get(authGuard, (req, res) => {
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
        [req.user.id, req.params.conversation_id],
      )
      .then((result) => {
        return res.json(result.rows);
      })
      .catch((err) => {
        console.log('error', err);
        return res.status(500).send('Server Error');
      });
  })
  .post(authGuard, (req, res) => {
    new Message()
      .save({
        body: req.body.body,
        conversation_id: parseInt(req.params.conversation_id),
        sent_by: req.user.id,
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
          [req.user.id, req.params.conversation_id],
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
