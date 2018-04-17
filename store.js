const crypto = require('crypto');
const { connection } = require('./constant.js');

module.exports = {
  authenticate: async ({ username, password }) => {
    console.log(`Authenticating user ${username}`);
    const { results } = await query(`SELECT * FROM UserCredential WHERE username = '${username}';`);
    if (results.length === 0 || password !== results[0].Password) {
      return { success: false };
    }
    if (password === results[0].Password) {
      var userInfo;
      if (results[0].UserType === 'Student')
        userInfo = await query(
          `SELECT Sid As Id, FirstName, LastName, UserType FROM Student AS S INNER JOIN UserCredential AS U ON S.Sid = U.Uid WHERE Sid = '${
            results[0].Uid
          }';`
        );
      else if (results[0].UserType === 'Teacher')
        userInfo = await query(
          `SELECT Tid As Id, FirstName, LastName, UserType FROM Teacher AS T INNER JOIN UserCredential AS U ON T.Tid = U.Uid WHERE Tid = '${
            results[0].Uid
          }';`
        );
      else if (results[0].UserType === 'Officer')
        userInfo = await query(
          `SELECT Oid As Id, FirstName, LastName, UserType FROM Officer AS O INNER JOIN UserCredential AS U ON O.Oid = U.Uid WHERE Oid = '${
            results[0].Uid
          }';`
        );
      else return { success: false };
      userInfo = userInfo.results[0];
      return { success: true, userInfo };
    }
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
