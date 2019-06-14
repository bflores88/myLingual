'use strict';

const projectId = 'mylingual';

require('dotenv').config();

let labels;

// [START vision_quickstart]
async function quickstart(image_link) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  // const [result] = await client.labelDetection('./wave.jpg');
  const [result] = await client.labelDetection(
    image_link
  );
  labels = result.labelAnnotations;
  // console.log('Labels:');
  // labels.forEach((label) => console.log(label.description));

  return labels;
}
// [END vision_quickstart]

module.exports = quickstart;

// quickstart()
//   .then(() => {
//     const text = labels[0].description;

//     const target = 'no';

//     translate
//       .translate(text, target)
//       .then((results) => {
//         const translation = results[0];

//         console.log(`Text: ${text}`);
//         console.log(`Translation: ${translation}`);
//       })
//       .catch((err) => {
//         console.error('ERROR:', err);
//       });
//   })
//   .catch(console.error);
