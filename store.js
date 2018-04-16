const crypto = require('crypto');
const { connection } = require('./constant.js');

module.exports = {
  authenticate: async ({ username, password }) => {
    console.log(`Authenticating user ${username}`);
    const { results } = await query(`SELECT Password FROM UserCredentials WHERE username = '${username}';`);
    if (results.length == 0) {
      return { success: false };
    }
    return { success: password === results[0].Password };
  }
};

function query(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) reject(error);
      resolve({ results, fields });
    });
  });
}
