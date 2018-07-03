var mysql = require("mysql");

var connectionPool = mysql.createPool({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'philance',
    database : 'philance',
    multipleStatements : true,
    insecureAuth: true,
    connectionLimit:30
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

  module.exports = connectionPool;
