'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../database/knex.js');

router.route('/:search_text').get((req, res) => {
  knex
    .raw(
      `SELECT english_word
      FROM words
      WHERE english_word LIKE ?`,
      [`%${req.params.search_text}%`],
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
