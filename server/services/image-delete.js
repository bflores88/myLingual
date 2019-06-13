const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

require('dotenv').config({ path: '../.env' });

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-west-2',
});

// create s3 instance
const s3 = new aws.S3();

// 'metadata:' holds key value pairs that I'd assume are queryable
// 'key:' holds the image title/link in s3 bucket

  const params = {
    Bucket: "mylingual_images", 
    Key: image
   };
   s3.deleteObject(params, function(err, data) {
     if (err) console.log(err, err.stack); 
     else console.log(data);
   
   });
