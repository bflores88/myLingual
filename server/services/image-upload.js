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

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mylingual-images',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: 'mylingual-images' });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

// export the image being uploaded
module.exports = upload;
