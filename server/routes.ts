import * as express from 'express';
const multer  = require('multer');

import * as AWS from 'aws-sdk';
let multerS3 = require('multer-s3');

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import FileCtrl from './controllers/file';

const BUCKET_NAME = "basis-europe";
const IAM_USER_KEY = "AKIA5CDIZQJKVE2TONPT";
const IAM_USER_SECRET = "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";

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});

const upload = multer({
  storage: multerS3({
    s3: s3bucket,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}${file.originalname}`);    }
  })
})

function setRoutes(app): void {
  const router = express.Router();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const fileCtrl = new FileCtrl();

 // Files
 router.route('/files').get(fileCtrl.getAll);
 router.route('/files/count').get(fileCtrl.count);
 router.route('/file').post(upload.single('file'),fileCtrl.uploadFile);
 router.route('/file/:id').get(fileCtrl.get);
 router.route('/file/:id').put(fileCtrl.update);
 router.route('/file/:id').delete(fileCtrl.delete);

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;
