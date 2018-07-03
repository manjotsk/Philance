'use strict';

module.exports = function (app) {
    /* eslint-disable global-require */
    app.use('/user', require('./user'));
    app.use('/project', require('./project'));
};
