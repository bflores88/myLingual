'use strict';

const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    req.logout();
    return res.json('{ success: logged out }')
  })
 
module.exports = router;