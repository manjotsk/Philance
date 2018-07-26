const sequelize = require('../../util/dbconnection');
var users = require("../../users/users.model");
const Op = sequelize.Op;
var helpers = require('../../helpers').default
var commonFunctions = require('../../helpers/common')
var userApi = {
    search: {
        findAllUsers: (callback) => {
            sequelize.sync()
                .then(() => {
                    users.findAll({
                        attributes: ['user_id', 'location']
                    })
                        .then(_users => {
                            callback({ statusCode: 200, responseData: _users })
                        })
                })
        },
        findUsersWithFirstName: (req, callback) => {
            var firstName = req.body.fname;
            var personType = req.body.pType;
            var lastName = req.body.lname;
            var location = req.body.loc;
            var distance = req.body.dist;
            sequelize.sync()
                .then(() => {
                    users.findAll({
                        where: {
                            [Op.and]: {
                                fname: {
                                    [Op.like]: firstName
                                },
                                lname: {
                                    [Op.like]: lastName
                                }
                            }
                        }
                    }).then((_users) => {
                        // res.status(200).send(users);
                        callback(null, { statusCode: 200, responseData: _users })
                    }).catch((err) => {
                        callback(err, { statusCode: 500, responseData: err })
                    })
                }).catch((err) => {
                    console.log(err)
                    // res.status(500).send('Error with the database' + err)
                    callback(err, { statusCode: 409, responseData: err })

                })
        },
        findUsersWithLocation: {
            onlyWithLocation: (req, callback) => {
                sequelize.sync()
                    .then(() => {
                        users.findAll({
                            attributes: ['user_id', 'location'],
                            where: {
                                location: {
                                    [Op.ne]: null
                                }
                            }
                        })
                            .then(_users => {
                                commonFunctions.commonFunctions.entitiesDistanceValidator(_users, req, (err, response) => {
                                    if (err) {
                                        callback(err, { statusCode: 500, responseData: err })
                                    } else {
                                        callback(null, { statusCode: 200, responseData: response })
                                    }
                                    return;
                                })
                            }).catch((err) => {
                                callback(err, { statusCode: 409, responseData: err })
                            })
                    }).catch((err) => {
                        callback(err, { statusCode: 409, responseData: err })
                    })
            }
        }
    }
}
exports.userApi = userApi;