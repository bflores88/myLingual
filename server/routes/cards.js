'use strict';

const express = require('express');
const router = express.Router();
const Card = require('../database/models/Card');
const Word = require('../database/models/Word');
const UserCard = require('../database/models/UserCard');
const UserCardLikes = require('../database/models/UserCardLikes');
const knex = require('../database/knex');
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');
const aws = require('aws-sdk');
const visionApi = require('../services/vision-api');
const translateApi = require('../services/translate-api');
const authGuard = require('../guards/authGuard');

require('dotenv').config({ path: '../.env' });

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-west-2',
});

const s3 = new aws.S3();

// TEMPORARY ACCESS VARIABLES
let pendingImage = '';
let spanish = '';
let italian = '';

router
  .route('/')
  // GET ALL ACTIVE/PUBLIC CARDS
  .get(authGuard, (req, res) => {
    new Card()
      .where({ active: true, public: true })
      .fetchAll({ withRelated: ['users', 'words', 'card_themes', 'created_by'] })
      .then((results) => {
        return res.send(results.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  })
  // CREATE A NEW CARD
  .post(authGuard, (req, res) => {
    // check if word exists

    const word = req.body.english_word.toLowerCase();
    new Word('english_word', word)
      .fetch()
      .then((wordResult) => {
        // IF THE WORD DOES NOT EXIST
        if (!wordResult) {
          new Word()
            .save({ english_word: word })
            .then((result) => {
              let newResult = result.toJSON();

              translateApi(word, newResult.id);

              return new Card().save({
                word_id: newResult.id,
                created_by: req.user.id,
                image_link: pendingImage,
                likes: 0,
                shares: 0,
                red_flagged: 0,
                downloads: 0,
                approved: true,
                public: false,
                active: true,
              });
            })
            .then((result) => {
              pendingImage = '';
              let newResult = result.toJSON();

              return new UserCard().save({
                user_id: req.user.id,
                card_id: newResult.id,
                attempts: 0,
                successes: 0,
              });
            })
            .then((result) => {
              return res.json(result);
            })
            .catch((error) => console.log('error', error));
        } else {
          // if the word exists, create a new card for the user
          return new Card()
            .save({
              word_id: wordResult.id,
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
            .then((result) => {
              pendingImage = '';
              let newResult = result.toJSON();

              return new UserCard().save({
                user_id: req.user.id,
                card_id: newResult.id,
                attempts: 0,
                successes: 0,
              });
            })
            .then((result) => {
              return res.json(result);
            })
            .catch((error) => {
              console.log('error', error);
            });
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

// LIKE VERIFY
router.route('/like/verify/:cardID&:userID')
.get((req, res) => {
  console.log('hit');
  new UserCardLikes({
    'user_id': req.params.userID,
    'card_id': req.params.cardID,
  })
  .fetch()
  .then((result) => {
    if (result) {
      return res.json({canLike: false});
    } else {
      return res.json({canLike: true});
    }
  })
  .catch(() => {
    return res.json({errorMessage: 'Error validating like eligibility.'});
  })
})

// LIKE BEHAVIOR
router.route('/like/:cardID&:userID')
.get((req, res) => {
  console.log(req.params);
  new UserCardLikes()
  .save({
    'user_id': req.params.userID,
    'card_id': req.params.cardID,
  })
  .then(() => {
    new Card('id', req.params.cardID)
    .fetch({columns: 'likes'})
    .then((card) => {
      const cardObj = card.toJSON();
      let likesCount = parseInt(cardObj.likes);
      likesCount++;

      new Card('id', req.params.cardID)
      .save({likes: likesCount})
      .then((card) => {
        const cardObj = card.toJSON();
        return res.json({updatedLikes: cardObj.likes});
      })
      .catch(() => {
        return res.json({errorMessage: 'Like update failed.'});
      })
    })
    .catch(() => {
      return res.json({errorMessage: 'Card not found.'});
    });
  })
  .catch(() => {
    return res.json({errorMessage: 'Like record failed.'});
  });
});

// DOWNLOAD VERIFY
router.route('/download/verify/:cardID&:userID')
.get((req, res) => {
  new UserCard({
    'user_id': req.params.userID,
    'card_id': req.params.cardID,
  })
  .fetch()
  .then((result) => {
    if (result) {
      return res.json({canDownload: false});
    } else {
      return res.json({canDownload: true});
    }
  })
  .catch(() => {
    return res.json({errorMessage: 'Error validating download eligibility.'});
  })
})

// DOWNLOAD BEHAVIOR
router.route('/download/:cardID&:userID')
.get((req, res) => {

  // in order to download a card the card must not already belong to a user.
  new UserCard({
    'user_id': req.params.userID,
    'card_id': req.params.cardID,
  })
  .fetch()
  .then((result) => {
    if (result) {
      // if the card is already paired with user so end the process.
      return res.json({errorMessage: 'Card already belongs to User.'});
    } else {
      // if the card isn't paired with user so create a new entry in users_cards.
      new UserCard()
      .save({
        user_id: req.params.userID,
        card_id: req.params.cardID,
        attempts: 0,
        successes: 0,
      })
      .then((userCard) => {
        // once save is complete then get the card from cards table
        const userCardObj = userCard.toJSON();
        
        new Card('id', userCardObj.card_id)
        .fetch({columns: 'downloads'})
        .then((card) => {
          // extract the download count and increment
          const cardObj = card.toJSON();
          let downloadCount = parseInt(cardObj.downloads);
          downloadCount++;

          // get card again and save changes
          new Card('id', userCardObj.card_id)
          .save({downloads: downloadCount})
          .then((card) => {
            // send updated download count back to app
            const cardObj = card.toJSON();
            return res.json({updatedDownloads: cardObj.downloads});
          })
          .catch(() => {
            return res.json({errorMessage: 'Error in download count update.'});
          })
        })
        .catch(() => {
          return res.json(cardObj);
        });
      })
      .catch(() => {
        return res.json({errorMessage: 'Error downloading card.'});
      }) 
    }
  })
  .catch(() => {
    return res.json({errorMessage: 'Error in download process. Try again.'});
  });
})

router.route('/share/:id')
.get((req, res) => {
  new Card('id', req.params.id)
  .fetch({columns: 'shares'})
  .then((card) => {
    const cardObj = card.toJSON();
    let shareCount = parseInt(cardObj.shares);
    shareCount++;

    new Card('id', req.params.id)
    .save({shares: shareCount})
    .then((card) => {
      const cardObj = card.toJSON();
      return res.json({shares: cardObj.shares});
    })
    .catch(() => {
      return res.json({errorMessage: 'Shares update failed.'});
    });
  })
  .catch(() => {
    return res.json({errorMessage: 'Card not found'});
  })
})

router.route('/:id').get(authGuard, (req, res) => {
  // GET A SPECIFIC CARD
  new Card('id', req.params.id)
    .where({ active: true })
    .fetch({ withRelated: ['words.spanish_translations', 'words.italian_translations', 'card_themes', 'users.tags'] })
    .then((result) => {
      const newResult = result.toJSON();
      newResult.english_word = newResult.words.english_word;
      newResult.spanish_translations = newResult.words.spanish_translations.spanish_word;
      newResult.italian_translations = newResult.words.italian_translations.italian_word;
      delete newResult.card_themes;
      delete newResult.words;
      return res.json(newResult);
    })
    .catch((error) => {
      return res.json({errorMessage: 'Card not found.'});
    });
});

// SEARCH FOR TERMS IN USERS AND CARDS
router.route('/search/:term').get(authGuard, (req, res) => {
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
  .post(authGuard, singleUpload, (req, res) => {
    // console.log(req.user)
    pendingImage = req.file.location;

    visionApi(req.file.location)
      .then((labels) => {
        const topThree = labels.splice(0, 3).map((label) => {
          return label.description;
        });

        console.log(pendingImage);
        return res.json({ results: topThree });
      })
      .catch(console.error);
  })
  .delete(authGuard, (req, res) => {
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
