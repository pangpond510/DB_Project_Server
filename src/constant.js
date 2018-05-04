const mysql = require('mysql');

const dbConfig = {
  host: 'db-mysql',
  port: '3306',
  user: 'admin',
  password: 'password',
  database: 'db_RegChula'
};

const corsConfig = {
  origin: true
};

module.exports = {
  dbConfig,
  corsConfig
};
