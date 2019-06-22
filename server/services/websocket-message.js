'use strict';

const Message = require('../database/models/Message');
const knex = require('../database/knex.js');

async function postMessage(msg) {

  new Message()
    .save({
      body: msg.body,
      conversation_id: msg.conversation_id,
      sent_by: msg.sent_by,
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
        [msg.sent_by, msg.conversation_id],
      );
    })
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
}

module.exports = postMessage;