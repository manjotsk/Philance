var distance = require('google-distance');
distance.apiKey = '';
var projects = require("./projects.model");
var projectDetails = require("./project.details.model");
var projectTeam = require("./projects.team.model");
var users = require("../users/users.model");
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
var config = require('../config/config')
var userHelper=require('../helpers/user')
const Op = sequelize.Op;

/**
 * This function is used to get
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createProjects = (req, res, next) => {
    console.info('\n\n\n', req.body, '\n\n\n')
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
            projectTeam.create({
                projectId:_projects.projectId,
                userId:req.body.userId,
                role:'OWNER',
                creationDate:new Date(),
                lastUpdatedDate:new Date(),
                createdBy:req.body.userId,
                lastUpdatedBy:req.body.userId,
                status:'ACCEPTED'
            })
            if (req.body.projectDetails) {
                sequelize.Promise.each(req.body.projectDetails, function (itemToUpdate) {
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
                });
            } else {
                res.status(200).send()
            }
        })
    })
}

exports.updateProjects = (req, res, next) => {
    var _count = 0;
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
    var _country = req.body.country
    var _zipCode = req.body.zipCode
    var _volunteers = req.body.volunteers
    var _freelancers = req.body.freelancers
    var _keywords = req.body.keywords
    var _resourceType = req.body.resourceType
    var _projectStatus = req.body.projectStatus
    var _impactCategories = req.body.impactCategories
console.log('\n\n\n\n',_volunteers,
    _freelancers);

    var _impactCategoriesSql='';
    if(_impactCategories){
        for(var i=0;i<_impactCategories.length;i++){
            _impactCategoriesSql=_impactCategoriesSql+`details.name= '${_impactCategories[i]}'  OR `
        }
    }
    var _sql2 = 'SELECT projects.*, details.name FROM philance.projects as projects INNER JOIN philance.project_details as details ON projects.project_id=details.project_id where projects.country=\'Afghanistan\' AND (details.name=\'Elderly\' OR details.name=\'Other\' )'
    var _sql = ''
    _sql = _impactCategories ? _sql + 'SELECT projects.*, details.name FROM philance.projects as projects   ' : 'SELECT projects.* FROM philance.projects as projects   ';
    _sql = _impactCategories ? _sql + ' INNER JOIN philance.project_details as details ON projects.project_id=details.project_id   ' : _sql;
    _sql=_sql+'where ';
    _sql = _country             ?   _sql + `projects.country = '${_country}'   AND ` : _sql;
    _sql = _volunteers          ?   _sql + `projects.volunteers > 0   AND ` : _sql;
    _sql = _freelancers         ?   _sql + `projects.freelancers > 0   AND ` : _sql;
    _sql = _keywords            ?   _sql + `projects.description LIKE '%${_keywords}%'   AND ` : _sql;
    _sql = _impactCategories    ?   _sql + `(${_impactCategoriesSql}  )` : _sql;
    _sql = _sql.slice(0, -6)
    _sql = _impactCategories    ?   _sql + `)` : _sql;

    sequelize.query(_sql, { type: sequelize.QueryTypes.SELECT }).then((projects) => {
        var respProjects={}
        var keys=[]
        for(var i=0;i<projects.length;i++){
            if(!keys.includes(projects[i].project_id)){
                respProjects[projects[i].project_id]=projects[i]
                respProjects[projects[i].project_id].interests=[]
                respProjects[projects[i].project_id].interests.push(projects[i].name)
            }else{
                respProjects[projects[i].project_id].interests.push(projects[i].name)
            }
            keys.push(projects[i].project_id)
        }
        
        res.status(200).send({
             respProjects:Object.values(respProjects)
        })
        delete respProjects;
        delete keys;

    })
        .catch((err) => {
            console.log(err)
        })

    // projects.findAll({
    //     hierarchy: true,
    //     attributes: ['project_id']
    //   }).then(function(results) {
    //     console.log(results)
    //     // res.render('index', { nested_cat: results });
    //   });

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
    
    projectTeam.findAll({ where: { projectId: req.params.projectId, userId: req.body.userId } }).then(_projectTeam => {
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

                users.findOne({
                    where:{
                        [Op.and]:{
                            userId:req.body.userId
                        }
                    }
                }).then((user)=>{
                    projectTeam.findOne({
                        where:{
                            [Op.and]:{
                                projectId: req.params.projectId,
                                role:'OWNER'
                            }
                        }
                    }).then((projectOwner)=>{
                        console.log(projectOwner.dataValues,'projectOwner');
                        console.log(user.dataValues,'user');
                        var dev
                        if (process.env.NODE_ENV === 'production'){
                            dev = config.production.secure;
            
                        }else{
                            dev = config.development.unsecure;
            
                        }
                        users.findOne({
                            where:{
                                [Op.and]:{
                                    userId:projectOwner.dataValues.userId
                                }
                            }
                        }).then((Owner)=>{
                            //email Owner
                            userHelper.emailUsers({
                                config:{
                                    from:'noreply@philance.org',
                                    to: Owner.dataValues.email,                      //email to be requested from the database
                                },
                                data:{
                                    subject:'Philance Project Application',
                                    text:'Someone has successfully applied'
                                }})
                        })

                        //email  applicant
                        userHelper.emailUsers({
                            config:{
                                from:'noreply@philance.org',
                                to: user.dataValues.email,                      //email to be requested from the database
                            },
                            data:{
                                subject:'Philance Project Application',
                                text:'You have successfully applied'
                            }})
                    })    
                })
                //send email

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
    projectTeam.belongsTo(projects, { foreignKey: 'projectId' });

    projectTeam.findAll({
        // raw: true,
        where: { projectId: req.params.projectId },
        include: [{ model: users, nested: false, duplicating: false, attributes: ['userId', 'firstName', 'lastName', 'email'] },{ model: projects, nested: false, duplicating: false, attributes: ['projectName'] }]
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