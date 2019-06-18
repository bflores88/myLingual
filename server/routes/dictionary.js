const http = require("https");
const express = require('express');

const router = express.Router();

router.route('/:word&:fields&:strictMatch')
.get((req, res) => {
  let options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: '/api/v2/entries/en-us/' + req.params.word.toLowerCase()
    + '?fields=' + req.params.fields 
    + '&strictMatch=' + req.params.strictMatch,
    method: 'GET',
    headers: {
      'app_id': process.env.OXFORD_DICTIONARIES_APP_ID,
      'app_key' : process.env.OXFORD_DICTIONARIES_APP_KEY,
    }
  }
  let dataString = ''; 
  
  http.get(options, (response) => {
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      dataString += chunk;
    });

    response.on('end', () => {
      let mainDefinitions = [];
      let subsenseDefinitions = [];
      let responseObj;
      let dataObj = JSON.parse(dataString);
      
       
      if (dataObj.results) {
        dataObj.results[0].lexicalEntries[0].entries[0].senses.forEach((sense) => {
          mainDefinitions.push(sense.definitions[0]);
          if (sense.subsenses){
            sense.subsenses.forEach((definition) => {
              subsenseDefinitions.push(definition.definitions[0]);
            })
          }
        });

        responseObj = {
          mainDefinitions: mainDefinitions,
          subsenseDefinitions: subsenseDefinitions,
        }

        return res.json(responseObj);
      } else {
        return res.json({
          errorMessage: 'Error retrieving definitions. ' +
          'Check word validity with validate function.'
        });
      }
    });
  })
  .on('error', (e) => {
    console.log('error getting definitions ', e);
  });
})

router.route('/validate/:word')
.get((req, res) => {
  const options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: '/api/v2/lemmas/en/' + req.params.word.toLowerCase(),
    method: "GET",
    headers: {
      'app_id': process.env.OXFORD_DICTIONARIES_APP_ID,
      'app_key' : process.env.OXFORD_DICTIONARIES_APP_KEY,
    }
  };
  let dataString = '';
  
  http.get(options, (response) => {
    response.setEncoding('utf8');
    
    response.on('data', (data) => {
      dataString += data;
    });
    response.on('end', () => {
      // console.log('dataString Validate', dataString);
      if (response.statusCode === 200) {
        return res.json({
          input: req.params.word,
          isWord: true
        });
      } else if (response.statusCode === 404) {
        return res.json({
          input: req.params.word,
          isWord: false
        });
      }
    });
  })
  .on('error', (e) => {
    console.log(e);
  });
});

module.exports = router;