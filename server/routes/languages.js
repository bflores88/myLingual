'use strict';

const express = require('express');
const router = express.Router();
const Language = require('../database/models/Language');
const UserLanguage = require('../database/models/UserLanguage');
const authGuard = require('../guards/authGuard');
const languagesGuard = require('../guards/languagesGuard');

router.route('/all').get((req, res) => {
  new Language()
    .fetchAll({})
    .then((result) => {
      return res.send(result.toJSON());
    })
    .catch((err) => {
      console.log('error', err);
    });
});

// add language

router.route('/').post((req, res) => {
  console.log(req.body);
  new UserLanguage({
    user_id: req.user.id,
    language_id: req.body.language_id,
    language_type: 'target',
    primary: true,
    active: true,
  })
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error', err);
    });
});

router.route('/').get(authGuard, (req, res) => {
  UserLanguage.where({ user_id: req.user.id, active: true })
    .orderBy('active', 'DESC')
    .orderBy('language_type', 'ASC')
    .orderBy('primary', 'DESC')
    .orderBy('id', 'ASC')
    .fetchAll({ withRelated: ['languages'] })
    .then((result) => {
      // respond with all active payment cards, sorted
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
});

// toggle primary target language
router
  .route('/:id')
  .put(authGuard, languagesGuard, (req, res) => {
    // get all of user's target languages
    UserLanguage.where({ user_id: req.user.id, active: true, language_type: 'target' })
      .fetchAll()
      .then((result) => {
        if (result.length < 1) {
          throw new Error('Must have at least one active target language to toggle primary.');
        }
        // return primary target language (next: update 'primary' to false)
        return UserLanguage.where({ user_id: req.user.id, primary: true, language_type: 'target' }).fetch();
      })
      .then((result) => {
        // if trying to set primary target to primary: exit out.
        if (result.id === parseInt(req.params.id)) {
          throw new Error('This language is already set to primary');
        }
        // return prior primary target to false (next: update requested 'primary' to true)
        return new UserLanguage('id', result.id).save({
          primary: false,
        });
      })
      .then(() => {
        // return requested target as primrary (next: get all of user's target languages)
        return new UserLanguage('id', parseInt(req.params.id)).save({
          primary: true,
        });
      })
      .then(() => {
        return UserLanguage.where({ user_id: req.user.id, active: true, language_type: 'target' })
          .orderBy('active', 'DESC')
          .orderBy('primary', 'DESC')
          .orderBy('id', 'ASC')
          .fetchAll({ withRelated: ['languages'] });
      })
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.log(err.message);
        if (
          err.message === 'Must have at least one active target language to toggle primary.' ||
          err.message === 'This language is already set to primary'
        ) {
          return res.status(400).send('Bad request');
        } else {
          return res.status(500).send('Server error');
        }
      });
  })
  .delete(authGuard, languagesGuard, (req, res) => {
    // get all of user's target languages
    UserLanguage.where({ user_id: req.user.id, active: true, language_type: 'target' })
      .fetchAll()
      .then((result) => {
        // identify language-to-delete & an alternate to assign as primary (if needed)
        const targetLanguages = result.toJSON();
        const languageToDelete = targetLanguages.find((language) => language.id === parseInt(req.params.id));
        const languageToPrimary = targetLanguages.find((language) => language.id !== parseInt(req.params.id));

        // disallow deletion if not learning any other languages
        if (result.length <= 1) {
          throw new Error('Must keep at least one target language');
        }

        // if passed by guard, but not in fetchAll, then must be native language
        if (!languageToDelete) {
          throw new Error('Cannot delete native language');
        }

        // if requested delete is not the primary language then defer to next promise
        if (!languageToDelete.primary) {
          return;
          // if it is primary, then randomly choose an active secondary & assign that as new primary
          // FYI, this is for safety. based on front-end routing this 'else' should never get called
        } else {
          return new UserLanguage('id', languageToPrimary.id).save({ primary: true });
        }
      })
      .then(() => {
        // convert requested delete to inactive/secondary
        return new UserLanguage('id', parseInt(req.params.id)).save({
          primary: false,
          active: false,
        });
      })
      .then(() => {
        return res.send('Successful delete');
      })
      .catch((err) => {
        console.log(err.message);
        if (
          err.message === 'Must keep at least one target language' ||
          err.message === 'Cannot delete native language'
        ) {
          return res.status(400).send('Bad request');
        } else {
          return res.status(500).send('Server error');
        }
      });
  });

module.exports = router;
