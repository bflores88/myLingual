'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const redis = require('connect-redis')(session);

const User = require('./database/models/User');

require('dotenv').config({ path: '../.env' });

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const login = require('./routes/login');
const logout = require('./routes/logout');
const cards = require('./routes/cards');
const decks = require('./routes/decks');
const users = require('./routes/users');
const forums = require('./routes/forums');
const posts = require('./routes/posts');
const conversations = require('./routes/conversations');
const quizzes = require('./routes/quizzes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  session({
    store: new redis({ url: process.env.REDIS_URL }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function(username, password, done) {
    return new User({ username: username })
      .fetch()
      .then((user) => {
        if (user === null) {
          return done(null, false, { message: 'bad username or password' });
        } else {
          user = user.toJSON();

          bcrypt
            .compare(password, user.password)
            .then((res) => {
              //Happy route: username exists, password matches
              if (res) {
                return done(null, user);
              }

              //Error route: Username exists, password does not match
              else {
                return done(null, false, { message: 'bad username or password' });
              }
            })
            .catch((err) => {
              console.log('err', err);
              return done(err);
            });
        }
      })
      .catch((err) => {
        console.log('err', err);
        return done(err);
      });
  }),
);

passport.serializeUser(function(user, done) {
  console.log('serializing');
  return done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');

  return new User({ id: user.id })
    .fetch()
    .then((user) => {
      user = user.toJSON();

      done(null, {
        id: user.id,
        username: user.username,
        email: user.email,
        active: user.active,
        role_id: user.role_id,
        name: user.name,
      });
    })
    .catch((err) => {
      console.log('err', err);
      return done(err);
    });
});

app.use('/api/login', login);

app.use('/api/cards', cards);
app.use('/api/decks', decks);
app.use('/api/users', users);
app.use('/api/forums', forums);

app.use('/api/posts', posts);

app.use('/api/conversations', conversations);
app.use('/api/quizzes', quizzes);

http.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
