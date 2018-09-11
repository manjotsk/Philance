var express = require('express');
var router = express.Router({mergeParams: true});

const UserController = require('./users.controller');
//const checkAuth = require('../util/check-auth');

router.post("/", UserController.createProfile);
router.put("/1", UserController.updateProfile);
// This is called for getting the user details
router.get("/:userId", UserController.getProfile);
router.get("/image/:userId", UserController.getUserImage);
// This is called for User Login
router.post("/login", UserController.login);
router.post("/passwordReset/create/:_userId", UserController.createPasswordResetToken);
router.post("/passwordReset/", UserController.passwordReset);
router.post("/search", UserController.search);
//router.post("/userUpdate/:_userId", checkAuth, UserController.userUpdate);

router.post("/passwordReset/:_userId", UserController.passwordReset);
// This is called for getting the user details
router.get("/:userId/projects", UserController.getProjects);

module.exports = router;
