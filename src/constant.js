const mysql = require('mysql');

const dbConfig = {
  host: 'db-mysql',         // for running with docker-compose in DB_Project_App
  // host: 'localhost',     // for running each component individually
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
