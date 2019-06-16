'use strict';

const express = require('express');
const router = express.Router();

require('dotenv').config({ path: '../../.env' });

router.route('/')
  .get((req, res) => {
    const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
    return res.json({client_id: googleClientId})
  })

module.exports = router;