var express = require('express');
var router = express.Router();

const UserController = require('./users.controller');
//const checkAuth = require('../util/check-auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/passwordReset/:_userId", UserController.passwordReset);
router.post("/search", UserController.search);
//router.post("/userUpdate/:_userId", checkAuth, UserController.userUpdate);

module.exports = router;
