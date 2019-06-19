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
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./database/models/User');

require('dotenv').config({ path: '../.env' });

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const login = require('./routes/login');
const logout = require('./routes/logout');
const cards = require('./routes/cards');
const decks = require('./routes/decks');
const decks_cards = require('./routes/decks_cards');
const users = require('./routes/users');
const forums = require('./routes/forums');
const posts = require('./routes/posts');
const conversations = require('./routes/conversations');
const translate = require('./routes/translate');
const quizzes = require('./routes/quizzes');
const quiz_contents = require('./routes/quiz_contents');
const contacts = require('./routes/contacts');
const searches = require('./routes/searches');
const languages = require('./routes/languages');
const dictionary = require('./routes/dictionary');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));

app.use(cookieParser());
app.set('trust proxy', 1);
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
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google',
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    },
  ),
);

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

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/cards', cards);
app.use('/api/decks', decks);
app.use('/api/decks_cards', decks_cards);
app.use('/api/users', users);
app.use('/api/forums', forums);
app.use('/api/posts', posts);
app.use('/api/conversations', conversations);
app.use('/api/translate', translate);
app.use('/api/quizzes', quizzes);
app.use('/api/quiz_contents', quiz_contents);
app.use('/api/contacts', contacts);
app.use('/api/searches', searches);
app.use('/api/languages', languages);
app.use('/api/dictionary', dictionary);

// io.of('/socket.io').on
let onlineUsers = {};

io.on('connect', (socket) => {
  console.log('connection made');

  socket.on('identify', (user) => {
    console.log('identify', user);

    onlineUsers[user.id] = socket;
    socket.user = user;

    socket.emit('verify', true);
    io.emit('online', user.id);
  });

  socket.on('disconnect', () => {
    const { user } = socket;
    if (user && user.id) {
      delete onlineUsers[user.id];
      io.emit('offline', user.id);
    }
  });

  // add room
  socket.on('create', (room) => {
    console.log('room', room)
    socket.join(room);
  });

  // join room
  socket.on('join', (data) => {
    console.log('joining room', data.room)
    socket.join(data.room)
  })

  // leave room
  socket.on('leave', (data) => {
    console.log('leaving room', data.room)
    socket.leave(data.room)
  })

  socket.on('message', (msg) => {
    console.log('server socket message', msg);
    // knex insert

    // console.log('online users', onlineUsers);
    console.log(msg.to);
    console.log(msg.id);

    const recipient = onlineUsers[msg.id];
    console.log('recipient', recipient);

    if (recipient) {
      recipient.emit('message', msg);
      console.log(recipient);
    }
  });

  // list of users
  socket.on('users', () => {
    socket.emit('users', Object.keys(onlineUsers));
  });
});

http.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
