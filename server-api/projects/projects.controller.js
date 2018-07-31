'use strict';
var distance = require('google-distance');
distance.apiKey = '';
var projects = require("./projects.model");
var projectDetails = require("./project.details.model");
// var users = require("../users/users.model");
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

exports.createProjects = (req, res, next) => {

    // projects.belongsTo(projectDetails, { as: 'projectDetails', foreignKey: 'projectId' });

    console.log('in Create Project');

    console.log("projectName" + req.body.projectName);
    console.log("description" + req.body.description);
    console.log("volunteers" + req.body.volunteers);
    console.log("freelancers" + req.body.freelancers);
    console.log("location" + req.body.location);
    console.log("startDate" + req.body.startDate);
    console.log("endDate" + req.body.endDate);
    console.log("estimatedBudget" + req.body.estimatedBudget);

    sequelize.sync();

    // return sequelize.transaction({
    //     type: Sequelize.Transaction.EXCLUSIVE
    // }, function (t) {

        sequelize.sync().then (() => projects.create({
            projectName: req.body.projectName,
            description: req.body.description,
            volunteers: req.body.volunteers,
            freelancers: req.body.freelancers,
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            estimatedBudget: req.body.estimatedBudget,
            lastUpdatedBy: req.body.userId,
            createdBy: req.body.userId
        }).then(_projects => {
            sequelize.transaction(function (t) {
                sequelize.Promise.each(req.body.projectDetails, function (itemToUpdate) {
                    // console.log(itemToUpdate)
                    projectDetails.create({
                        // itemToUpdate,
                        projectId : _projects.projectId,
                        detailType : itemToUpdate.detailType,
                        name : itemToUpdate.name,
                        certificationReq : itemToUpdate.certificationReq,
                        certificationLink: itemToUpdate.certificationLink,
                        attribute1 : itemToUpdate.attribute1,
                        attribute2 : itemToUpdate.attribute2,
                        attribute3 : itemToUpdate.attribute3,
                        attribute4 : itemToUpdate.attribute4,
                        attribute5 : itemToUpdate.attribute5,                       
                        createdBy : req.body.userId,
                        lastUpdatedBy : req.body.userId
                    });
                }).then((_createdRecords) => {
                    projects.findAll({
                        where: { projectId: _projects.projectId }
                        // ,include: [{ model: projectDetails, nested: true, as: 'projectDetails' }]
                    }).then((_resultProject) => {
                        res.status(200).json({
                            project: _resultProject
                        });
                    }
                    )
                });
            })
            // projects.findAll({
            //     where: { projectId: _projects.projectId },
            //     include: [{ model: projectDetails, nested: true, as: 'projectDetails' }]
            // }).then((_resultProject) => {
            //     res.status(200).json({
            //         project: _resultProject
            //     });
            // }
            // )
        })

    // }
    )

}

/**
 * GET - list of projects
 */
exports.findProjects = (req, res, next) => {
    var _resourceType = ((req.body.resourceType != null && req.body.resourceType != '') ? req.body.resourceType : 1);
    var _projectStatus = ((req.body.projectStatus != null && req.body.projectStatus != '') ? ('\'' + req.body.projectStatus + '\'') : null);
    var skillQuery = '';
    var impactCategoryQuery = '';
    if ((req.body.skills != null && req.body.skills != '')) {
        console.log('SKILLS NOT NULL');
    var _skills = Array.prototype.map.call(req.body.skills, function (item) { return item.skill; }).join("|");
        skillQuery = ' and prj.project_id = det1.project_id and det1.name REGEXP \'' + _skills + '\' AND det1.detail_type = \'SKILLS\' ';
    }
    if ((req.body.impactCategories != null && req.body.impactCategories != '')) {
        console.log('IMPACT CATEGORY NOT NULL');
    var _impactCategories = Array.prototype.map.call(req.body.impactCategories, function (item) { return item.category; }).join("|");
        impactCategoryQuery = ' and prj.project_id = det2.project_id AND det2.detail_type = \'IMPACT_CATEGORY\' and det2.name REGEXP \'' + _impactCategories + '\' ';
    }
     

    var sql = 'SELECT prj.project_id as projectId,prj.project_name as projectName,prj.description as description,prj.location as location,prj.estimated_budget as estimatedBudget,prj.status as status FROM philance.projects prj,philance.project_details det1,philance.project_details det2 where 1=1 AND ' +
        ' prj.status = ifnull(' + _projectStatus + ', prj.status) AND prj.project_name REGEXP \'' + req.body.keywords + '\' and case when ' +
        _resourceType + ' like \'/%Volunteers/%\' then prj.volunteers > 0 when ' + _resourceType + ' like \'/%Freelancers/%\' then prj.freelancers > 0 else 1=1 end '+
        skillQuery + impactCategoryQuery +' GROUP BY prj.project_name , prj.description , prj.location , prj.estimated_budget , prj.status';

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

    // projects.belongsTo(projectDetails, { as: 'projectDetails', foreignKey: 'projectId' });
    projects.belongsTo(projectDetails, { foreignKey: 'projectId' });

    sequelize.sync().then(() => projects.findAll({
        where: { projectId: req.query.projectId },
        include: [{ model: projectDetails, nested: true }]
    }).then((_project) => {
        // projectDetails.findAll({ where: { projectId: req.query.projectId }, order: sequelize.col('detail_type') }).then((_projectDetails) => {

        res.status(200).json({
            project: _project
        });
    }
    )

    )
}
