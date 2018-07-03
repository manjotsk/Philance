'use strict';

/**
 * GET - list of projects
 */
exports.index = (req, res) => {
    let projects = { 'name': 'Project', 'description': 'Description' };
    res.status(200).json(projects);
};