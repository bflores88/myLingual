'use strict';

const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;
const translationClient = new TranslationServiceClient();
const projectId = process.env.PROJECT_ID;
const express = require('express');
const router = express.Router();

router.route('/')
.post((req, res) => {
  console.log('get request to root');
  const request = {
    parent: translationClient.locationPath(projectId, 'global'),
    contents: [req.body.text],
    mimeType: 'text/plain',
    sourceLanguageCode: 'en-US',
    targetLanguageCode: req.body.target,
  };
  translationClient.translateText(request)
  .then((results) => {
    let translation = results[0].translations[0].translatedText;
    return res.json({translation: translation});
  })
  .catch((error) => {
    return res.json(error);
  });
});

module.exports = router;