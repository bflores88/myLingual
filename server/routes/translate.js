'use strict';

const Language = require('../database/models/Language');
const translate = require('@google-cloud/translate');
const express = require('express');

const translationClient = new translate.Translate();
const router = express.Router();

router.route('/')
.post((req, res) => {
  new Language()
  .fetchAll()
  .then((results) => {
    const languages = results.toJSON().map((language) => {
      return translationClient.translate(req.body.english_word, language.code)
      .then((result) => {
        return {
          translation: result[0],
          languageCode: language.code, 
        }
      })
      .catch((error) => {
        return {
          code: error.code,
          message: error.message,
        };
      })
    });

    Promise.all(languages).then((translations) => {
      const response = translations.filter(item => typeof item.translation === 'string');
      return res.json(response);
    })
    .catch(() => {
      return res.json({message: 'Error encountered with translations.'});
    });
  })    
  .catch(() => {
    return res.json({message: 'Error encountered fetching valid languages from database.'});
  })
});

module.exports = router;
