const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3307',
  user: 'testuser',
  password: 'bN6t7rgcvSjjTVAn',
  database: 'db_testing'
});

module.exports = {
  connection: connection
};
