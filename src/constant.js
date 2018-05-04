const mysql = require('mysql');

const dbConfig = {
  host: '127.0.0.1',
  port: '3307',
  user: 'root',
  password: 'my-secret-password',
  database: 'db_RegChula'
};

const corsConfig = {
  origin: true
};

module.exports = {
  dbConfig,
  corsConfig
};
