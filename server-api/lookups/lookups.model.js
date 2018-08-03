'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');

const commonLookups = sequelize.define('philance_lookups', {
    lookupType: {
        type: Sequelize.STRING,
        primaryKey: true,
        field: 'lookup_type'
    },
    lookupCode: {
        type: Sequelize.STRING,
        primaryKey: true,
        field: 'lookup_code'
    },
    meaning: {
        type: Sequelize.STRING,
        primaryKey: true,
        field: 'meaning'
    },
    description: {
        type: Sequelize.STRING,
        primaryKey: true,
        field: 'description'
    },
    creationDate: {
        type: Sequelize.DATE,
        field: 'creation_date',
        defaultValue: Sequelize.NOW
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    lastUpdatedDate: {
        type: Sequelize.DATE,
        field: 'last_updated_date',
        defaultValue: Sequelize.NOW
    },
    lastUpdatedBy: {
        type: Sequelize.INTEGER,
        field: 'last_updated_by'
    }
},
    {
        timestamps: false,
        freezeTableName: true
    },
);

module.exports = commonLookups;