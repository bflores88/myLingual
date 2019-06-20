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
// const cors = require('cors');

// app.use(cors());

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
const google = require('./routes/google');

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://mylingual.me/api/auth/google/callback',
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log('google strategy in progress', profile);
      // console.log('profile', profile);
      new User()
        .where({ username: profile.emails[0].value })
        .fetch()
        .then((result) => {
          if (!result) {
            console.log('need to make new user');

            new User({
              active: true,
              private_mode: false,
              role_id: 3,
              name: profile.name.givenName,
              email: profile.emails[0].value,
              username: profile.emails[0].value,
              oauth_token: accessToken,
              lingots: 0,
              profile_image_url: profile.photos[0].value,
            })
              .save()
              .then((result) => {
                console.log('new result:', result);
                return done(null, result);
              })
              .catch((err) => {
                console.log('this error is happening', err);
                return err;
              });
          } else {
            result = result.toJSON();
            console.log('1283793871308471329084712394', profile.photos[0].value);
            // console.log('*&*&*&*&*&*&*&*&*&*', result);
            return done(null, result);
          }
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    },
  ),
);

passport.serializeUser(function(user, done) {
  if (user.models !== undefined) {
    let userObj = {
      id: user.models[0].attributes.id,
      active: user.models[0].attributes.active,
      private_mode: user.models[0].attributes.private_mode,
      role_id: user.models[0].attributes.role_id,
      username: user.models[0].attributes.username,
      oauth_token: user.models[0].attributes.oauth_token,
      password: user.models[0].attributes.password,
      name: user.models[0].attributes.name,
      email: user.models[0].attributes.email,
      profile_image_url: user.models[0].attributes.profile_image_url,
      lingots: user.models[0].attributes.lingots,
      created_at: user.models[0].attributes.created_at,
      updated_at: user.models[0].attributes.updated_at,
    };
    // console.log('userObj**********************>',userObj);
    return done(null, userObj);
  } else {
    // console.log('else statement user', user);
    return done(null, user);
  }
});

passport.deserializeUser(function(user, done) {
  // console.log('deserialize user>>>>>>>>', user);
  console.log('deserializing');

  return new User({ id: user.id })
    .fetch()
    .then((user) => {
      user = user.toJSON();
      console.log('user deserialize', user);

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
      console.log('deserialize err>>>>>', err);
      return done(err);
    });
  // }
});

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureMessage: 'https://mylingual.me/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log('hits***********', req.user);
    // console.log(req)
    // res.json(req.user);
    res.redirect('https://mylingual.me/google');
  },
);

app.use('/api/google_user', google);
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
