'use strict';

const express = require('express');
const router = express.Router();

const projectsController = require('./projects.controller');

router.post("/createProjects", projectsController.createProjects);
router.post("/findProjects", projectsController.findProjects);
router.get("/findProjects", projectsController.findProjectById);

//router.get('/', controller.index);

module.exports = router;
