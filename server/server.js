'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;

require('dotenv').config({ path: '../.env' });

const PORT = process.env.EXPRESS_CONTAINER_PORT;
const translationClient = new TranslationServiceClient();
const projectId = process.env.PROJECT_ID;

const cards = require('./routes/cards');
const decks = require('./routes/decks');
const users = require('./routes/users');
const forums = require('./routes/forums');

const posts = require('./routes/posts');

const conversations = require('./routes/conversations');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));

app.use('/api/cards', cards);
app.use('/api/decks', decks);
app.use('/api/users', users);
app.use('/api/forums', forums);

app.use('/api/posts', posts);

app.use('/api/conversations', conversations);

app.get('/', (req, res) => {
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


http.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
