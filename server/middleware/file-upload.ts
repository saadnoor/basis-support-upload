const multer  = require('multer');

import * as AWS from 'aws-sdk';
const multerS3 = require('multer-s3');

const BUCKET_NAME = 'basis-europe';
const IAM_USER_KEY = 'AKIA5CDIZQJKVE2TONPT';
const IAM_USER_SECRET = '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';

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});

const upload = multer({
  storage: multerS3({
    s3: s3bucket,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => cb(null, {fieldName: file.fieldname}),
    key: (req, file, cb) => cb(null, `${Date.now().toString()}${file.originalname}`)
  })
});

export default upload;
