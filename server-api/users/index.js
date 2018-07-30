var express = require('express');
var router = express.Router();

const UserController = require('./users.controller');
//const checkAuth = require('../util/check-auth');

router.post("/", UserController.createProfile);
router.put("/", UserController.updateProfile);
router.get("/", UserController.getProfile);

router.post("/login", UserController.login);

//router.post("/passwordReset/:_userId", UserController.passwordReset);

module.exports = router;
