'use strict';

module.exports = function (app) {
    /* eslint-disable global-require */
    app.use('/users', require('./users'));
    app.use('/project', require('./project'));
};
