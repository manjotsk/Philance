const sequelize = require('../../util/dbconnection');
var users = require("../../users/users.model");
const Op = sequelize.Op;
var helpers = require('../../helpers').default
var commonFunctions = require('../../helpers/common')
var userApi = {
    search: {
        findAllUsers: (callback) => {
            console.log('Method:findAllUsers:-Fetching Data From Database\n\n\n')
            sequelize.sync()
                .then(() => {
                    users.findAll({

                    })
                        .then(_users => {
                            callback({ statusCode: 200, responseData: _users })
                        })
                })
        },
        findUsersWithFirstNameAndLastName: (req, callback) => {
            console.log('Method:findUsersWithFirstNameAndLastName:-Fetching Data From Database\n\n\n')
            sequelize.sync()
                .then(() => {
                    users.findAll({
                        where: {
                            [Op.and]: {
                                fname: {
                                    [Op.like]: req.body.fname
                                },
                                lname: {
                                    [Op.like]: req.body.lname
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
        findUsersWithFirstName: (req, callback) => {
            console.log('Method:findUsersWithFirstName:-Fetching Data From Database\n\n\n')
            sequelize.sync()
                .then(() => {
                    users.findAll({
                        where: {
                            fname: {
                                [Op.like]: req.body.fname
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
        findUsersWithLastName: (req, callback) => {
            console.log('Method:findUsersWithLastName:-Fetching Data From Database\n\n\n')
            sequelize.sync()
                .then(() => {
                    users.findAll({
                        where: {
                            lname: {
                                [Op.like]: req.body.lname
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
                console.log('Method:onlyWithLocation:-Fetching Data From Database\n\n\n')
                sequelize.sync()
                    .then(() => {
                        users.findAll({
                            where: {
                                location: {
                                    [Op.ne]: null
                                }
                            }
                        })
                            .then(_users => {
                                if (_users.length == 0) {
                                    callback(null, { statusCode: 200, responseData: _users })
                                } else {
                                    commonFunctions.commonFunctions.entitiesDistanceValidator(_users, req, (err, response) => {
                                        if (err) {
                                            callback(err, { statusCode: 500, responseData: err })
                                        } else {
                                            callback(null, { statusCode: 200, responseData: response })
                                        }
                                        return;
                                    })
                                }
                            }).catch((err) => {
                                callback(err, { statusCode: 500, responseData: { message: 'Issue with the database' } })
                            })
                    }).catch((err) => {
                        callback(err, { statusCode: 409, responseData: err })
                    })
            },
            locationAndType: (req, callback) => {
                console.log('Method:locationAndType:-Fetching Data From Database\n\n\n')
                sequelize.sync()
                    .then(() => {
                        users.findAll({
                            where: {
                                [Op.and]: {
                                    location: {
                                        [Op.ne]: null
                                    },
                                    ptype: {
                                        [Op.like]: req.body.ptype
                                    }
                                }
                            }
                        })
                            .then(_users => {
                                if (_users.length == 0) {
                                    callback(null, { statusCode: 200, responseData: _users })
                                } else {
                                    commonFunctions.commonFunctions.entitiesDistanceValidator(_users, req, (err, response) => {
                                        if (err) {
                                            callback(err, { statusCode: 500, responseData: err })
                                        } else {
                                            callback(null, { statusCode: 200, responseData: response })
                                        }
                                        return;
                                    })
                                }
                            }).catch((err) => {
                                callback(err, { statusCode: 500, responseData: { message: 'Issue with the database' } })
                            })
                    }).catch((err) => {
                        callback(err, { statusCode: 409, responseData: err })
                    })
            },
            locationTypeAndName: (req, callback) => {
                console.log('Method:locationTypeAndName:-Fetching Data From Database\n\n\n')
                sequelize.sync()
                    .then(() => {
                        users.findAll({
                            where: {
                                [Op.and]: {
                                    fname: {
                                        [Op.like]: req.body.fname
                                    },
                                    lname: {
                                        [Op.like]: req.body.lname
                                    }
                                }
                            }
                        })
                            .then(_users => {
                                if (_users.length == 0) {
                                    callback(null, { statusCode: 200, responseData: _users })
                                } else {
                                    commonFunctions.commonFunctions.entitiesDistanceValidator(_users, req, (err, response) => {
                                        if (err) {
                                            callback(err, { statusCode: 500, responseData: err })
                                        } else {
                                            callback(null, { statusCode: 200, responseData: response })
                                        }
                                        return;
                                    })
                                }
                            }).catch((err) => {
                                callback(err, { statusCode: 500, responseData: { message: 'Issue with the database' } })
                            })
                    }).catch((err) => {
                        console.log(err)
                        // res.status(500).send('Error with the database' + err)
                        callback(err, { statusCode: 409, responseData: err })

                    })
            },
            locationTypeAndFirstName: (req, callback) => {
                console.log('Method:locationTypeAndFirstName:-Fetching Data From Database\n\n\n')
                sequelize.sync()
                    .then(() => {
                        users.findAll({
                            where: {
                                fname: {
                                    [Op.like]: req.body.fname
                                }

                            }
                        })
                            .then(_users => {
                                if (_users.length == 0) {
                                    callback(null, { statusCode: 200, responseData: _users })
                                } else {
                                    commonFunctions.commonFunctions.entitiesDistanceValidator(_users, req, (err, response) => {
                                        if (err) {
                                            callback(err, { statusCode: 500, responseData: err })
                                        } else {
                                            callback(null, { statusCode: 200, responseData: response })
                                        }
                                        return;
                                    })
                                }
                            }).catch((err) => {
                                callback(err, { statusCode: 500, responseData: { message: 'Issue with the database' } })
                            })
                    }).catch((err) => {
                        console.log(err)
                        // res.status(500).send('Error with the database' + err)
                        callback(err, { statusCode: 409, responseData: err })

                    })
            },
            locationTypeAndLastName: (req, callback) => {
                console.log('Method:locationTypeAndLastName:-Fetching Data From Database\n\n\n')
                sequelize.sync()
                    .then(() => {
                        users.findAll({
                            where: {

                                lname: {
                                    [Op.like]: req.body.lname
                                }

                            }
                        })
                            .then(_users => {
                                if (_users.length == 0) {
                                    callback(null, { statusCode: 200, responseData: _users })
                                } else {
                                    commonFunctions.commonFunctions.entitiesDistanceValidator(_users, req, (err, response) => {
                                        if (err) {
                                            callback(err, { statusCode: 500, responseData: err })
                                        } else {
                                            callback(null, { statusCode: 200, responseData: response })
                                        }
                                        return;
                                    })
                                }
                            }).catch((err) => {
                                callback(err, { statusCode: 500, responseData: { message: 'Issue with the database' } })
                            })
                    }).catch((err) => {
                        console.log(err)
                        // res.status(500).send('Error with the database' + err)
                        callback(err, { statusCode: 409, responseData: err })

                    })
            },
        },
        findUsersWithNameAndType: (req, callback) => {
            console.log('Method:findUsersWithNameAndType:-Fetching Data From Database\n\n\n')
            sequelize.sync()
                .then(() => {
                    users.findAll({
                        where: {
                            [Op.and]: {
                                fname: {
                                    [Op.like]: req.body.fname
                                },
                                lname: {
                                    [Op.like]: req.body.lname
                                },
                                ptype: {
                                    [Op.like]: req.body.ptype
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
        findUsersWithFirstNameAndType: (req, callback) => {
            console.log('Method:findUsersWithFirstNameAndType:-Fetching Data From Database\n\n\n')
            sequelize.sync()
                .then(() => {
                    users.findAll({
                        where: {
                            [Op.and]: {
                                fname: {
                                    [Op.like]: req.body.fname
                                },
                                ptype: {
                                    [Op.like]: req.body.ptype
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
        findUsersWithLastNameAndType: (req, callback) => {
            console.log('Method:findUsersWithLastNameAndType:-Fetching Data From Database\n\n\n')
            sequelize.sync()
                .then(() => {
                    users.findAll({
                        where: {
                            [Op.and]: {
                                lname: {
                                    [Op.like]: req.body.lname
                                },
                                ptype: {
                                    [Op.like]: req.body.ptype
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
        }
    }
}
exports.userApi = userApi;