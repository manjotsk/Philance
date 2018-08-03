'use strict';

const express = require('express');
var router = express.Router({mergeParams: true});

const controller = require('./lookups.controller');

router.get('/:lookupType', controller.getLookupDetails);

module.exports = router;
