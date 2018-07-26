'use strict';

module.exports = function (app) {
    /* eslint-disable global-require */
    app.use('/philance/users', require('./users'));
    app.use('/philance/projects', require('./projects'));
};
