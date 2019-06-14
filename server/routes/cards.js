'use strict';

const express = require('express');
const router = express.Router();
const Card = require('../database/models/Card');
const Word = require('../database/models/Word');
const UserCard = require('../database/models/UserCard');
const knex = require('../database/knex');
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');
const aws = require('aws-sdk');
const visionApi = require('../services/vision-api');

require('dotenv').config({ path: '../.env' });

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-west-2',
});

const s3 = new aws.S3();

let pendingImage = '';

router
  .route('/')
  // fetches all cards
  .get((req, res) => {
    new Card()
      .fetchAll({ withRelated: ['users', 'words', 'card_themes', 'created_by'] })
      .then((results) => {
        return res.send(results.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  })
  .post((req, res) => {
    // check if word exists
    console.log('reached check if card exists')
    const word = req.body.english_word.toLowerCase();
    new Word('english_word', word)
      .fetch()
      .then((wordResult) => {
        console.log('fetched word to check if exists');
        if (!wordResult) {
          console.log('word does not exist; reached created word')
          console.log('word', word)
          // creates new row in Word table
          new Word()
            .save({ english_word: word })
            .then((result) => {
              let newResult = result.toJSON();

              console.log('create new card')
              return new Card()
                .save({
                word_id: newResult.id,
                card_theme_id: 1,
                created_by: req.user.id,
                image_link: pendingImage,
                likes: 0,
                shares: 0,
                red_flagged: 0,
                downloads: 0,
                approved: true,
                public: false,
                active: true,
              })
            })
            .then((result) => {
              let newResult = result.toJSON();
              console.log('create user-card', newResult)
              return new UserCard()
                .save({
                user_id: req.user.id,
                card_id: newResult.id,
                attempts: 0,
                successes: 0,
                })
            })
            .then((result) => {
              return res.json(result)
            })
            .catch((error) => (
            console.log('error', error)
          ))
        } else {
          const newResult = wordResult.toJSON();

          return new Card('word_id', newResult.id)
            .fetch()
            .then((cardResult) => {
              const newResult = cardResult.toJSON();

              return new UserCard({ card_id: newResult.id, user_id: req.user.id }).fetch();
            })
            .then((userCardResult) => {
              // check if user already has a user_card with specific word
              if (!userCardResult) {
                const newResult = userCardResult.toJSON();

                // creates a new UserCard if they don't own card
                new UserCard().save({
                  user_id: req.user.id,
                  card_id: newResult.card_id,
                });
              } else {
                return res.json({
                  message: 'You already own this card.  Edit or delete your existing card before creating a new one!',
                });
              }
            });
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

router.route('/:id').get((req, res) => {
  new Card('id', req.params.id)
    .fetch({ withRelated: ['words.spanish_translations', 'words.italian_translations', 'card_themes', 'users.tags'] })
    .then((result) => {
      const newResult = result.toJSON();
      newResult.english_word = newResult.words.english_word;
      newResult.spanish_translations = newResult.words.spanish_translations.spanish_word;
      newResult.italian_translations = newResult.words.italian_translations.italian_word;
      newResult.card_theme = newResult.card_themes.name;
      delete newResult.card_themes;
      delete newResult.words;
      return res.json(newResult);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

router.route('/search/:term').get((req, res) => {
  let search = req.params.term;
  let lowerSearch = search.toLowerCase();

  knex('words')
    .where(knex.raw('LOWER("english_word") LIKE ?', [`%${lowerSearch}%`]))
    .then((result) => {
      // check length to verify word exists
      if (!result.length) {
        return res.send('A flashcard has not been generated for this word.');
      }

      return new Word('english_word', result[0].english_word)
        .fetch({
          withRelated: ['spanish_translations', 'italian_translations', 'cards'],
        })
        .then((result) => {
          const resultJSON = result.toJSON();
          const spanish_translations = resultJSON.spanish_translations.spanish_word;
          const italian_translations = resultJSON.italian_translations.italian_word;

          // pass translations to cards
          const updateCards = resultJSON.cards.map((card) => {
            card.spanish_translations = spanish_translations;
            card.italian_translations = italian_translations;
            card.english_word = resultJSON.english_word;
            return card;
          });

          // only send back approved, active, and public cards
          const filterUpdateCards = updateCards.filter((card) => {
            return card.approved && card.active && card.public;
          });

          const newResult = {
            english_word: resultJSON.english_word,
            cards: filterUpdateCards,
          };

          return res.json(newResult);
        })
        .catch((err) => {
          console.log('error', err);
        });
    });
});

// test upload to s3 image bucket working!!!
router
  .route('/upload')
  .post(singleUpload, (req, res) => {
    pendingImage = req.file.location;
    return res.json({ results: ['a', 'b', 'c'] });
    // return res.json({ image_link: req.file.location });
    
    // visionApi(req.file.location)
    //   .then((labels) => {
    //     const topThree = labels.splice(0, 3).map((label) => {
    //       return label.description
    //     })

    //     console.log(pendingImage);
    //     return res.json({ results: topThree });
    //   })
    //   .catch(console.error);
  })
  .delete((req, res) => {
    const params = {
      Bucket: 'mylingual-images',
      Key: '1560450624222',
    };
    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    res.json({ message: 'delete success!' });
  });

module.exports = router;
