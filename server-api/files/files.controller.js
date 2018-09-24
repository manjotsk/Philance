'use strict';
var fs = require('fs');
var users = require('../users/users.model')
var {mediaHost}=require('../config')
const UserController = require('../users/users.controller');
const ProjectsController = require('../projects/projects.controller');
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
const moment = require('moment');

exports.filesUpload = (req, res, next) => {

    switch(JSON.parse(req.body.param).uploadType){

        case 'userProfileImage':{
            UserController.updateUserImage(req,res,next)
        }
        break;
        case 'startProjectFiles':{
            sequelize.query(`INSERT INTO philance.project_attachments (project_id,name,attachment,creation_date,created_by,last_updated_date,last_updated_by) VALUES (${JSON.parse(req.body.param).userInfo.projectId},'name','${req.file.path}','${new Date()}',${JSON.parse(req.body.param).userInfo.userId},'${new Date()}',${JSON.parse(req.body.param).userInfo.userId})`)
            .then(()=>{
                res.status(200).send({
                    filepath:mediaHost()+req.file.filename
                })
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send({
                    error:err
                })
            })
        }
        break;

        default:null
        break;
    }
}