'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconnection');
var users = require("./users.model");

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully for user skills.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const userSkills = sequelize.define('user_skills', {
    userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,  
        primaryKey: true,   
        references: {   
            model: 'users',
            key: 'user_id'
        }
    },
    skillCode: {
        type: Sequelize.STRING,
        field: 'skill_code'
    },
    skillName: {
        type: Sequelize.STRING,
        field: 'skill_name',
        primaryKey: true        
    },
    certified: {
        type: Sequelize.STRING,
        field: 'certified',
        defaultValue : 'NO',
        values : ['YES','NO']
    },
    certificationLink: {
        type: Sequelize.STRING,
        field: 'certification_link'
    },
    startDate: {
        type: Sequelize.DATE,
        field: 'start_date',
        defaultValue: Sequelize.NOW
    },
    endDate: {
        type: Sequelize.DATE,
        field: 'end_date'
    },
    creationDate: {
        type: Sequelize.DATE,
        field: 'creation_date'
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    lastUpdatedDate: {
        type: Sequelize.DATE,
        field: 'last_updated_date'
    },
    lastUpdatedBy: {
        type: Sequelize.INTEGER,
        field: 'last_updated_by'
    },
},
    {
        timestamps: false,
        freezeTableName: true
    }
)
users.belongsTo(userSkills,{as: 'userSkills', foreignKey:'userId'});
// users.associate = function (models) {
//     users.belongsTo(userSkills,{foreignKey:'userId'});
// };

module.exports = userSkills;