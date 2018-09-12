'use strict';
var distance = require('google-distance');
distance.apiKey = '';
var projects = require("./projects.model");
var projectDetails = require("./project.details.model");
var projectTeam = require("./projects.team.model");
var users = require("../users/users.model");
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

/**
 * This function is used to get
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createProjects = (req, res, next) => {
console.info(req.file)
    projects.create({
            projectName: req.body.projectName,
            description: req.body.description,
            volunteers: req.body.volunteers,
            freelancers: req.body.freelancers,
            zipCode: req.body.zipCode,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            estimatedBudget: req.body.estimatedBudget,
            lastUpdatedBy: req.body.userId,
            createdBy: req.body.userId,
            country: req.body.country
        }).then(_projects => {
            sequelize.transaction(function (t) {
                if(req.body.projectDetails){ sequelize.Promise.each(req.body.projectDetails, function (itemToUpdate) {
                    projectDetails.create({
                        // itemToUpdate,
                    projectId: _projects.projectId,
                    detailType: itemToUpdate.detailType,
                    name: itemToUpdate.name,
                    certificationReq: itemToUpdate.certificationReq,
                        certificationLink: itemToUpdate.certificationLink,
                    attribute1: itemToUpdate.attribute1,
                    attribute2: itemToUpdate.attribute2,
                    attribute3: itemToUpdate.attribute3,
                    attribute4: itemToUpdate.attribute4,
                    attribute5: itemToUpdate.attribute5,
                    createdBy: req.body.userId,
                    lastUpdatedBy: req.body.userId
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
                });}else{
                    res.status(200).send()
                }
            })
        })
}

exports.updateProjects = (req, res, next) => {
    var _count = 0;
    console.log('In update projects');
    projects.hasMany(projectDetails, { foreignKey: 'projectId' });

    sequelize.transaction(function (t) {
        projects.update({
            projectName: req.body.projectName,
            description: req.body.description,
            status: req.body.status,
            volunteers: req.body.volunteers,
            freelancers: req.body.freelancers,
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            estimatedBudget: req.body.estimatedBudget,
            lastUpdatedBy: req.body.userId,
        }, {
                where: { projectId: req.params.projectId }, omitNull: true
            }, { transaction: t }).then(_projects => {
                projectDetails.destroy({ where: { projectId: req.params.projectId }, truncate: true, force: true },
                    { transaction: t }).then(

                        sequelize.Promise.each(req.body.projectDetails, function (itemToUpdate) {

                            projectDetails.create({
                                projectId: req.params.projectId,
                                detailType: itemToUpdate.detailType,
                                name: itemToUpdate.name,
                                certificationReq: itemToUpdate.certificationReq,
                                certificationLink: itemToUpdate.certificationLink,
                                attribute1: itemToUpdate.attribute1,
                                attribute2: itemToUpdate.attribute2,
                                attribute3: itemToUpdate.attribute3,
                                attribute4: itemToUpdate.attribute4,
                                attribute5: itemToUpdate.attribute5,
                                createdBy: req.body.userId,
                                lastUpdatedBy: req.body.userId
                            }, { omitNull: true }, { transaction: t }).then((_createdRecords) => {
                                _count++;
                                if (_count === (req.body.projectDetails).length) {
                                    projects.findAll({
                                        where: { projectId: req.params.projectId },
                                        include: [{ model: projectDetails, nested: true, duplicating: false, required: false }]
                                    }).then((_projects) => {
                                        res.status(200).json({
                                            project: _projects
                                        });
                                    }
                                    ).catch(function (err) {
                                        console.log(err);
                                    });
                                }
                            }
                            ).catch(function (err) {
                                console.log(err);
                            });
                        }
                        )
                    )
            }
            )
    }
    )
}



/**
 * GET - list of projects based on User Search Criteria. It may or may not be created or assigned to the user 
 */
exports.getProjects = (req, res, next) => {
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
        _resourceType + ' like \'/%Volunteers/%\' then prj.volunteers > 0 when ' + _resourceType + ' like \'/%Freelancers/%\' then prj.freelancers > 0 else 1=1 end ' +
        skillQuery + impactCategoryQuery + ' GROUP BY prj.project_name , prj.description , prj.location , prj.estimated_budget , prj.status';

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

exports.getProjectById = (req, res, next) => {

    projects.hasMany(projectDetails, { foreignKey: 'projectId' });
    projects.hasMany(projectTeam, { foreignKey: 'projectId' });
    users.hasMany(projectTeam, { foreignKey: 'userId' });
    projectTeam.belongsTo(users, { foreignKey: 'userId' });

    projects.findAll({
        raw: true,
        where: { projectId: req.params.projectId },
        include: [{ model: projectDetails, nested: true, duplicating: false, required: false },
        {
            model: projectTeam, nested: true, duplicating: false, required: false,
            include: [{ model: users, required: true, nested: true, attributes: ['userId', 'firstName', 'lastName', 'email'] }//, {attributes: ['fname' ,'lname', 'email'] }//, where : {userId : projectTeam.userId}}
            ]
        }]
    }).then((_project) => {

        res.status(200).json({
            project: _project
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}


exports.resourceApplyForProject = (req, res, next) => {
    console.log(req.params.projectId);
    
    projectTeam.findAll({ where: { projectId: req.params.projectId, userId: req.body.userId } }).then(_projectTeam => {
        console.log('_projectTeam : ' + _projectTeam);
        console.log('_projectTeam Length : ' + _projectTeam.length);
        if (_projectTeam === null || _projectTeam.length === 0) {
            projectTeam.create({
                projectId: req.params.projectId,
                userId: req.body.userId,
                applicantMessage: req.body.applicantMessage,
                role: req.body.role,
                type: req.body.type,
                status: 'APPLIED',
                // appliedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                // creationDate: sequelize.literal('CURRENT_TIMESTAMP'),
                createdBy: req.body.userId,
                // lastUpdatedDate: sequelize.literal('CURRENT_TIMESTAMP'),
                lastUpdatedBy: req.body.userId
            }).then((_projectTeam) => {
                res.status(200).json({
                    message: "User successfully applied for the Project",
                    Application: _projectTeam
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            })
        } else {
            console.log('User already applied for the Project');
            return res.status(409).json({
                message: "User already applied for the Project",
                Application: _projectTeam
            })
        }

    }
    )
}



/**
 * This is to get the list if users who applied for a specific Project. This is called when comes to one comes to candidate review page
 */

exports.resourceListForReview = (req, res, next) => {

    projects.hasMany(projectDetails, { foreignKey: 'projectId' });
    projects.hasMany(projectTeam, { foreignKey: 'projectId' });
    users.hasMany(projectTeam, { foreignKey: 'userId' });
    projectTeam.belongsTo(users, { foreignKey: 'userId' });

    projectTeam.findAll({
        raw: true,
        where: { projectId: req.params.projectId },
        include: [{ model: users, nested: false, duplicating: false, attributes: ['userId', 'firstName', 'lastName', 'email'] }]
    }).then((_projectTeam) => {
        res.status(200).json({
            Candidates: _projectTeam
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

/**
 * 
 */
exports.resourceApproveOrReject = (req, res, next) => {

    users.hasMany(projectTeam, { foreignKey: 'userId' });
    projectTeam.belongsTo(users, { foreignKey: 'userId' });

    sequelize.transaction(function (t) {
        sequelize.Promise.each(req.body.projectTeam, function (itemToUpdate) {
            projectTeam.update({
                startDate: itemToUpdate.startDate,
                endDate: itemToUpdate.endDate,
                role: itemToUpdate.role,
                type: itemToUpdate.type,
                status: itemToUpdate.status,
                lastUpdatedBy: itemToUpdate.userId,
                lastUpdatedDate: itemToUpdate.lastUpdatedDate
            }, { where: { projectId: req.params.projectId, userId: itemToUpdate.applicantId } })
        })
    }).then(_updatedRows => {
        projectTeam.findAll({
        raw: true,
        where: { projectId: req.params.projectId },
        include: [{ model: users, nested: false, duplicating: false, attributes: ['userId', 'firstName', 'lastName', 'email'] }]
        }).then(function (_projectTeam) {
        res.status(200).json({
            Candidates: _projectTeam
        });
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    })
}
/**
 * Update the database after the upload finishes regarding the user files
 */

exports.updateUserAttachments = (req, res, next) => {
    
}