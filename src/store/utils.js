const mysql = require('mysql');

const { dbConfig } = require('../constant.js');

const pool = mysql.createPool(dbConfig);

const query = sql => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      connection.query(sql, [], (err, results) => {
        connection.release(); // always put connection back in pool after last query
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  });
};

const openConnection = () => {
  connection.connect();
};

const closeConnection = () => {
  connection.end();
};

module.exports = {
  query,
  openConnection,
  closeConnection
};

/*

*/
