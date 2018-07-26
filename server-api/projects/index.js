'use strict';

const express = require('express');
const router = express.Router();

const projectsController = require('./projects.controller');

router.post("/", projectsController.createProjects);
router.post("/search", projectsController.findProjects);
router.get("/", projectsController.findProjectById);

module.exports = router;
