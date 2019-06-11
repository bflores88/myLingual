'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config({ path: '../.env' });

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const cards = require('./routes/cards');
const decks = require('./routes/decks');
const users = require('./routes/users');
const forums = require('./routes/forums');

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

app.use('/', (req, res) => {
  res.send('smoke test');
});

app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
