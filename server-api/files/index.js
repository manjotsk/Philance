'use strict';

const express = require('express');
var router = express.Router({mergeParams: true});

const controller = require('./files.controller');

const multer = require('multer');
const uuidv4 = require('uuid/v4');
var filename=''
const storage = multer.diskStorage({
    destination: './uploads',
    filename(req, file, cb) {
        console.log('++++++++++++');
        console.log(file);
        filename=file.originalname.split('.')[file.originalname.split('.').length-1]
      cb(null, uuidv4()+'.'+filename);
    },
  });
  const upload = multer({ storage });


router.post('/',upload.single('file'), controller.filesUpload);

module.exports = router;
