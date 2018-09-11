'use strict';
var fs = require('fs');
var users = require('../users/users.model')
var {mediaHost}=require('../config')
const UserController = require('../users/users.controller');
const ProjectsController = require('../projects/projects.controller');

exports.filesUpload = (req, res, next) => {
    console.log(JSON.parse(req.body.param).uploadType,'************************')

    switch(JSON.parse(req.body.param).uploadType){

        case 'userProfileImage':{
            UserController.updateUserImage(req,res,next)
        }
        break;
        case 'startProjectFiles':{
            res.status(200).send({
                filepath:mediaHost()+req.file.filename
            })
        }
        break;

        default:null
        break;
    }
}