'use strict';

const { Translate } = require('@google-cloud/translate');
const projectId = 'mylingual';

const translate = new Translate({
  projectId: projectId,
});

require('dotenv').config();

let labels;

// [START vision_quickstart]
async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  // const [result] = await client.labelDetection('./wave.jpg');
  const [result] = await client.labelDetection(
    'https://images-na.ssl-images-amazon.com/images/I/81xQBb5jRzL._SY355_.jpg',
  );
  labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach((label) => console.log(label.description));
}
// [END vision_quickstart]

quickstart()
  .then(() => {
    const text = 'ksjd';

    const target = 'es';

    translate
      .translate(text, target)
      .then((results) => {
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  })
  .catch(console.error);
