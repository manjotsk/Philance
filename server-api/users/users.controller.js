// var connectionPool = require('../util/dbconnection');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var users = require("./users.model");
var userSkills = require("./user.skills.model");
const sequelize = require('../util/dbconnection');

exports.createProfile = (req, res, next) => {

    sequelize.sync().then(() => users.findOne({ where: { email: req.body.email } }).then(_user => {
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
    )
}

exports.login = (req, res, next) => {
console.log ('Login : '+ req.body.email +' Passowrd : '+ req.body.password);
    sequelize.sync().then(() => users.findOne({
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
    )

}

exports.getProfile = (req, res, next) => {
    // users.associate = function (models) {
    // };
    sequelize.sync().then(() => users.findAll({
        where: { userId: req.query.userId },
        required : false ,
        include: [{ model: userSkills, nested: true, as: 'userSkills' }]
    }).then((_user) => {
        res.status(200).json({
            user: _user
        });
    }
    )
    )
}


exports.updateProfile = (req, res, next) => {

    // users.belongsTo(userSkills, { as: 'userSkills', foreignKey: 'userId' });

    sequelize.sync().then(() => users.update({
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
                userId: req.body.userId,
            }
        }, {
            include: [{ model: userSkills, nested: true }]
        }
    ).then(_user => {
        if (_user) {
            userSkills.destroy({ where: { userId: req.body.userId }, truncate: true, force: true }).then(
                sequelize.transaction(function (t) {
                    sequelize.Promise.each(req.body.userSkills, function (itemToUpdate) {
                        userSkills.create(itemToUpdate);
                    }).then((_createdRecords) => {
                        console.log('Updated Records : ' + _createdRecords);
                    });
                })
            )
            users.findAll({
                where: { userId: req.body.userId },
                include: [{ model: userSkills, nested: true, as: 'userSkills' }]
            }).then((_user) => {
                res.status(200).json({
                    user: _user
                });
            }
            )
        }
    }
    )
    )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

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


