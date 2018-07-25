// var mysql = require("mysql");
const Sequelize = require('sequelize');

// var connectionPool = mysql.createPool({
//     host : 'localhost',
//     port : 3306,
//     user : 'philance',
//     password : 'ph1ldb',
//     database : 'philance',
//     multipleStatements : true,
//     insecureAuth: true,
//     connectionLimit:30
//   });

const sequelize = new Sequelize('philance', 'philance', 'ph1ldb', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});
  // connectionPool.getConnection(function(err,conn){
  //   if (err) throw err;
  //   console.log('Connected!');
  //   connection = conn;
  // })

  // connection.connect((err) => {
  //   if (err) throw err;
  //   console.log('Connected!');
  // });

  // connection.end((err) => {
  //   // The connection is terminated gracefully
  //   // Ensures all previously enqueued queries are still
  //   // before sending a COM_QUIT packet to the MySQL server.
  // });

  // module.exports = connectionPool;
  module.exports = sequelize;
