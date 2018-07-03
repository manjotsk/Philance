'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./project.controller');

router.get('/', controller.index);

module.exports = router;
