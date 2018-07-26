'use strict';
var distance = require('google-distance');
distance.apiKey = '';
var projects = require("./projects.model");
var projectDetails = require("./project.details.model");
// var users = require("../users/users.model");
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

exports.createProjects = (req, res, next) => {

    console.log('in Create Project');

    console.log("projectName" + req.body.projectName);
    console.log("description" + req.body.description);
    console.log("volunteers" + req.body.volunteers);
    console.log("freelancers" + req.body.freelancers);
    console.log("location" + req.body.location);
    console.log("startDate" + req.body.startDate);
    console.log("endDate" + req.body.endDate);
    console.log("estimatedBudget" + req.body.estimatedBudget);

    sequelize.sync().then(() => projects.create({
        projectName: req.body.projectName,
        description: req.body.description,
        volunteers: req.body.volunteers,
        freelancers: req.body.freelancers,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        estimatedBudget: req.body.estimatedBudget,
        createdBy: req.body.userId,
    }).then(_projects => {
        var skillKeys;
        (req.body.skills).forEach(function (element) {
            skillKeys = Object.keys(element);
            skillKeys.forEach(function (item) {
                if (item == 'skill') {
                    console.log(item + " : " + element[item]);
                    projectDetails.create({
                        projectId: _projects.dataValues.projectId,
                        detailType: 'SKILLS',
                        name: element[item],
                        createdBy: req.body.userId,
                        lastUpdatedBy: req.body.userId
                    }).catch(err => {
                        console.log('Error while creating the Project details : ' + element[item]);
                        console.log(err);
                    })
                }
            });
        });
        var impactcategoryKeys;
        (req.body.impactCategories).forEach(function (element) {
            impactcategoryKeys = Object.keys(element);
            impactcategoryKeys.forEach(function (item) {
                if (item == 'category') {
                    console.log(item + " : " + element[item]);
                    projectDetails.create({
                        projectId: _projects.dataValues.projectId,
                        detailType: 'IMPACT_CATEGORY',
                        name: element[item],
                        createdBy: req.body.userId,
                        lastUpdatedBy: req.body.userId
                    }).then(_projectDtls => {
                        res.status(200).json({ projects: _projects });
                    }).catch(err => {
                        console.log('Error while creating the Project details : ' + err);
                    })
                }
            });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }))
}

/**
 * GET - list of projects
 */
exports.findProjects = (req, res, next) => {
    var _resourceType = ((req.body.resourceType != null && req.body.resourceType != '') ? req.body.resourceType : 1);
    var _projectStatus = ((req.body.projectStatus != null && req.body.projectStatus != '') ? ('\'' + req.body.projectStatus + '\'') : null);
    var _skills = Array.prototype.map.call(req.body.skills, function (item) { return item.skill; }).join("|");
    var _impactCategories = Array.prototype.map.call(req.body.impactCategories, function (item) { return item.category; }).join("|");
    var sql = 'SELECT prj.project_id as projectId,prj.project_name as projectName,prj.description as description,prj.location as location,prj.estimated_budget as estimatedBudget,prj.status as status FROM philance.projects prj,philance.project_details det1,philance.project_details det2 where 1=1 AND prj.project_id = det1.project_id AND prj.project_id = det2.project_id AND det1.detail_type = \'SKILLS\' AND det2.detail_type = \'IMPACT_CATEGORY\'' +
        ' and prj.status = ifnull(' + _projectStatus + ', prj.status) AND prj.project_name REGEXP \'' + req.body.keywords + '\' and (det1.name REGEXP \'' + _skills + '\' or det2.name REGEXP \'' + _impactCategories + '\') and case when ' +
        _resourceType + ' like \'/%Volunteers/%\' then prj.volunteers > 0 when ' + _resourceType + ' like \'/%Freelancers/%\' then prj.freelancers > 0 else 1=1 end GROUP BY prj.project_name , prj.description , prj.location , prj.estimated_budget , prj.status';

    // var sql = 'SELECT proj.project_id as projectId,proj.project_name as projectName, proj.description as description,proj.volunteers as volunteers, proj.freelancers as freelancers, proj.location as location, proj.start_date as startDate,proj.end_date as endDate, proj.estimated_budget as estimatedBudget, proj.creation_date as creationDate, proj.created_by as createdBy,proj.last_updated_by as lastUpdatedBy, proj.last_updated_date as lastUpdatedDate, proj.status as status FROM projects proj';// where proj.project_name REGEXP \'' + req.body.keywords + '\'';

    // Commented as the Location is an entry and not required to get from User Profile
    // users.findOne({
    //     where: { userId: req.body.userId },
    //     attributes: ['location']
    // }).then(_users => {

    sequelize.query(sql, { model: projects }).then((_projects) => {

        var _count = 0;
        var _length = _projects.length;

        // Below code is used to iterate the return projects and validate with the distance with the google-distance api. As there is limited number of calls to the API, currently it's commented

        // _projects.forEach(function (element, i) {
        //     distance.get(
        //         {
        //             origin: req.body.location,
        //             destination: element.dataValues.location,
        //             units: 'imperial',
        //             mode: 'driving'
        //         },
        //         function (err, data) {
        //             _count++;
        //             if (data.distance > req.body.distance) {
        //                 _projects = _projects.filter(
        //                     projects => (
        //                         projects.projectId !== element.dataValues.projectId
        //                     ));
        //             }
        //             if (_count === _length) res.status(200).json({ projects: _projects });
        //         })
        // }        
        // )

        // Below res.status statement should be commented if the above foreach is uncommented
        res.status(200).json({ projects: _projects });

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    // })
};


/**
 * This is to get the specific Project details based on the projectId 
 */

exports.findProjectById = (req, res, next) => {

    sequelize.sync().then(() => projects.findOne({ where: { projectId: req.query.projectId } }).then((_project) => {
        projectDetails.findAll({ where: { projectId: req.query.projectId }, order: sequelize.col('detail_type') }).then((_projectDetails) => {
            res.status(200).json({
                project: _project,
                projectDetails: _projectDetails
            });
        })

    }
    )

    )
}
