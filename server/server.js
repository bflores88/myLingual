'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

require('dotenv').config({ path: '../.env' });

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const login = require('./routes/login');
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

app.use('/api/login', login);
app.use('/api/cards', cards);
app.use('/api/decks', decks);
app.use('/api/users', users);
app.use('/api/forums', forums);

app.use('/api/posts', posts);

app.use('/api/conversations', conversations);


http.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
