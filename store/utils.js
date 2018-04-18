const { connection } = require('../constant.js');

const query = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = {
  query
};
