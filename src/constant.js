const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3307',
  user: 'root',
  password: 'Np4Rc5bnN8GuVMfT',
  database: 'db_structure'
});

const corsConfig = {
  origin: true
};

module.exports = {
  connection,
  corsConfig
};
