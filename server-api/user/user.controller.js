var connectionPool = require('../util/dbconnection');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
        var _sql = 'SELECT count(*) as total FROM user_registration where email = ?';
        connectionPool.query(_sql, req.body.email, (err, userCount) => {
            if (err) {
                console.error();
                console.log('In user registration user count error');
                throw err;
            }
            if (userCount[0].total >= 1) {
                return res.status(409).json({
                    message: "User # " + req.body.firstName + " " + req.body.lastName + " already registered"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: "password hashing failed! detailed error as follows - " + err
                        });
                    } else {
                        var user = [
                            [req.body.userId, req.body.firstName, req.body.lastName, req.body.email, hash]
                        ];
                        connectionPool.query('INSERT INTO user_registration (user_id,first_name,last_name,email,password) VALUES ?', [user], (err, result) => {
                            if (err) {
                                console.error();
                                throw err;
                            };
                            res.status(200).json({
                                message: "User # " + req.body.firstName + " " + req.body.lastName + " Registered Successfully"
                            });
                        }
                        );
                    }
                });
            }
        });
}

exports.login = (req, res, next) => {
    var _sql = 'SELECT user_id,email,password FROM user_registration where email = ?';
    connectionPool.query(_sql, req.body.email, (err, user) => {
        if (err) {
            console.error();
            console.log('in user authentication error');
            throw err;
        }
        if (user.length < 1) {
            return res.status(409).json({
                message: "authentication failed"
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(409).json({
                        message: "authentication failed"
                    });
                }

                if (result) {
                    console.log(user[0].email);
                    console.log(user[0].user_id);
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0].user_id
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
        }
    });
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


