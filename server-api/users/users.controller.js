// var connectionPool = require('../util/dbconnection');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var users = require("./users.model");
var userSkills = require("./user.skills.model");
var userNotifications = require("./user.notifications.model");
var projects = require("../projects/projects.model");
var projectDetails = require("../projects/project.details.model");
var projectTeam = require("../projects/projects.team.model");
const sequelize = require('../util/dbconnection');

exports.createProfile = (req, res, next) => {

    users.findOne({ where: { email: req.body.email } }).then(_user => {
        console.log('_user : ' + _user);
        if (_user == null) {
            console.log('Not Registered');
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: "password hashing failed! detailed error as follows - " + err
                    });
                } else {                    
                    users.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    }).then((_user) => {
                        res.status(200).json({
                            message: "User # " + req.body.firstName + " " + req.body.lastName + " Registered Successfully",
                            user: _user
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err.message
                        });
                    })
                }
            })
        } else {
            console.log('User Registered');
            return res.status(409).json({
                message: "User # " + req.body.firstName + " " + req.body.lastName + " already registered",
                user: _user
            })
        }

    }
    )
}

exports.login = (req, res, next) => {
    console.log('Login : ' + req.body.email + ' Passowrd : ' + req.body.password);
    
    users.findOne({
        where: { email: req.body.email }
    }).then(_user => {

        bcrypt.compare(req.body.password, _user.password, (err, result) => {
            if (err) {
                return res.status(409).json({
                    message: "authentication failed"
                });
            }

            if (result) {
                const token = jwt.sign(
                    {
                        email: _user.email,
                        userId: _user.userId
                    }, 'philance_secret',
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "authentication successful",
                    token: token
                });
            }
            res.status(409).json({
                message: "authentication failed"
            });
        });

    })

}

exports.getProfile = (req, res, next) => {

    users.hasMany(userSkills, { foreignKey: 'userId' });
    users.findAll({
        where: { userId: req.params.userId },
        include: [{ model: userSkills, nested: true, duplicating: false, required: false }]
    }).then((_user) => {
        res.status(200).json({
            user: _user
        });
    }
    )
}


exports.updateProfile = (req, res, next) => {
    var _count = 0;
    // users.belongsTo(userSkills, { as: 'userSkills', foreignKey: 'userId' });

    users.hasMany(userSkills, { foreignKey: 'userId' });
    users.hasOne(userNotifications, { foreignKey: 'userId' });

    // sequelize.transaction(function (t) {
        users.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        location: req.body.location,
        interests: req.body.interests,
        organization: req.body.organization,
        rate: req.body.rate,
        lastupdatedBy: req.body.userId
    },
        {
            where: {
                    userId: req.params.userId,
            }
        }, {
            include: [{ model: userSkills, nested: true }]
        }
    ).then(_user => {
        if (_user) {
                userSkills.destroy({ where: { userId: req.params.userId }, truncate: true, force: true }).then(
                sequelize.transaction(function (t) {
                    sequelize.Promise.each(req.body.userSkills, function (itemToUpdate) {
                            userSkills.create({
                                userId: req.params.userId,
                                skillCode: itemToUpdate.skillCode,
                                skillName: itemToUpdate.skillName,
                                certified: itemToUpdate.certified,
                                certificationLink: itemToUpdate.certificationLink,
                                startDate: itemToUpdate.startDate,
                                endDate: itemToUpdate.endDate,
                                createdBy: req.body.userId,
                                lastUpdatedBy: req.body.userId
                    }).then((_createdRecords) => {
                                _count++;
                                if (_count === (req.body.userSkills).length) {
                                // if (_createdRecords) {
                                    if ( typeof req.body.userNotifications !== 'undefined' &&  req.body.userNotifications !== null) {
                                    userNotifications.findOne({ where: { userId: req.params.userId } }).then(_userNotifications => {
    
                                        if (_userNotifications) {
                                            userNotifications.update({
                                                notificationTrigger: req.body.userNotifications.notificationTrigger,
                                                email: req.body.userNotifications.email,
                                                text: req.body.userNotifications.text,
                                                push: req.body.userNotifications.push,
                                                lastUpdatedBy: req.params.userId,
                                            }, { where: { userId: req.params.userId } }).then(_updateCount => {
            users.findAll({
                                                    where: { userId: req.params.userId },
                                                    include: [{ model: userSkills, nested: true, duplicating: false, required: false },
                                                    { model: userNotifications, nested: true, duplicating: false, required: false }]
            }).then((_user) => {
                res.status(200).json({
                    user: _user
                });
            }
            )
                                            }
                                            )
                                        } else {
                                            userNotifications.create({
                                                notificationTrigger: req.body.userNotifications.notificationTrigger,
                                                email: req.body.userNotifications.email,
                                                text: req.body.userNotifications.text,
                                                push: req.body.userNotifications.push,
                                                lastUpdatedBy: req.params.userId,
                                                userId: req.params.userId
                                            }).then(_userNotifications => {
                                                users.findAll({
                                                    where: { userId: req.params.userId },
                                                    include: [{ model: userSkills, nested: true, duplicating: false, required: false },
                                                    { model: userNotifications, nested: true, duplicating: false, required: false }]
                                                }).then((_user) => {
                                                    res.status(200).json({
                                                        user: _user
                    });
                                                }
                                                )
                                            }
                                            )
                                        }
                                    }
                                    )
                                } else {
                                    users.findAll({
                                        where: { userId: req.params.userId },
                                        include: [{ model: userSkills, nested: true, duplicating: false, required: false },
                                        { model: userNotifications, nested: true, duplicating: false, required: false }]
                                    }).then((_user) => {
                                        res.status(200).json({
                                            user: _user
                                        });
                                    }
                                    )
                                }
                                }
                            })
                        })
                })
            )
            // users.findAll({
            //     where: { userId: req.body.userId },
            //     include: [{ model: userSkills, nested: true, as: 'userSkills',duplicating: false,required : false }]
            // }).then((_user) => {
            //     res.status(200).json({
            //         user: _user
            //     });
            // }
            // )
        }
    }
        ).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    // })
}

/**
 * This is to get the list of projects either created by user or applied by the user
 */

exports.getProjects = (req, res, next) => {

    projects.hasMany(projectDetails, { foreignKey: 'projectId' });
    projects.hasMany(projectTeam, { foreignKey: 'projectId' });
    users.hasMany(projectTeam, { foreignKey: 'userId' });
    projectTeam.belongsTo(users, { foreignKey: 'userId' });

    var sql = 'select distinct proj.*, \'OWNER\' from projects proj where 1 = 1 and proj.created_by =' + req.params.userId + ' union ' +
        'select distinct proj.*, projteam.role from projects proj, project_team projteam where 1 = 1 and proj.project_id = projteam.project_id and user_id =' + req.params.userId;

    sequelize.sync();
    sequelize.query(sql, { model: projects }).then((_projects) => {
        res.status(200).json({
            Projects: _projects
        });
    }
    )
}

exports.passwordReset = (req, res, next) => {
    //   User.remove({ _id: req.params.userId })
    //     .exec()
    //     .then(result => {
    //       res.status(200).json({
    //         message: "User deleted"
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       res.status(500).json({
    //         error: err
    //       });
    //     });
    console.log("In user password reset Controller");
};


